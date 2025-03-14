// src/lib/auth.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getUserById } from './db';
import { UserRole } from './types';

// Secret key for JWT (should be in .env file in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

interface JwtPayload {
  id: number;
  email: string;
  role: UserRole;
}

// Middleware to verify JWT token
export async function verifyToken(request: NextRequest): Promise<JwtPayload | null> {
  try {
    // Get token from cookies
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return null;
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

// Check if user is authenticated
export async function isAuthenticated(request: NextRequest) {
  const user = await verifyToken(request);
  return !!user;
}

// Check if user has a specific role
export async function hasRole(request: NextRequest, requiredRole: UserRole): Promise<boolean> {
  const user = await verifyToken(request);
  return user?.role === requiredRole;
}

// Middleware to protect routes
export async function withAuth(
  request: NextRequest,
  roles: UserRole[] = []
) {
  const user = await verifyToken(request);

  if (!user) {
    return {
      authenticated: false,
      authorized: false,
    };
  }

  // If no specific roles are required, just check if authenticated
  if (roles.length === 0) {
    return {
      authenticated: true,
      authorized: true,
      user
    };
  }

  // Check if user has required role
  const hasRequiredRole = roles.includes(user.role);
  
  return {
    authenticated: true,
    authorized: hasRequiredRole,
    user
  };
}

// Helper function to create unauthorized response
export function unauthorized() {
  return new NextResponse(
    JSON.stringify({ message: 'Unauthorized' }),
    {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

// Helper function to create forbidden response
export function forbidden() {
  return new NextResponse(
    JSON.stringify({ message: 'Access denied' }),
    {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}