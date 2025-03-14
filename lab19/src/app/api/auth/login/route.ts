// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { getUserByEmail, verifyPassword } from '@/lib/db';
import jwt from 'jsonwebtoken';
import { LoginCredentials } from '@/lib/types';

// Secret key for JWT (should be in .env file in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

export async function POST(request: Request) {
  try {
    const credentials: LoginCredentials = await request.json();

    // Validate required fields
    if (!credentials.email || !credentials.password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await getUserByEmail(credentials.email);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const passwordValid = user.password 
      ? await verifyPassword(credentials.password, user.password)
      : false;
    
    if (!passwordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Remove password from user object before sending response
    const { password, ...userWithoutPassword } = user;

    // Set HTTP-only cookie with the token
    const response = NextResponse.json({
      user: userWithoutPassword,
      message: 'Login successful'
    }, { status: 200 });
    
    // Set secure cookie with token
    response.cookies.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}