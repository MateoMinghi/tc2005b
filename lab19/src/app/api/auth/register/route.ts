// src/app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import { createUser, getUserByEmail } from '@/lib/db';
import { RegisterData } from '@/lib/types';
import jwt from 'jsonwebtoken';

// Secret key for JWT (should be in .env file in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

export async function POST(request: Request) {
  try {
    const data: RegisterData = await request.json();

    // Validate required fields
    if (!data.username || !data.email || !data.password) {
      return NextResponse.json(
        { error: 'Username, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(data.email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Create new user (default role is 'user')
    const user = await createUser(data.username, data.email, data.password);
    if (!user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
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

    // Set HTTP-only cookie with the token
    const response = NextResponse.json({
      user,
      message: 'Registration successful'
    }, { status: 201 });

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
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}