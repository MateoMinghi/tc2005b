// src/app/api/providers/route.ts
import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { Provider } from '@/lib/types';
import { withAuth, forbidden, unauthorized } from '@/lib/auth';

// GET /api/providers - Available to all users (authenticated or not)
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM suppliers ORDER BY created_at DESC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch providers' }, { status: 500 });
  }
}

// POST /api/providers - Only available to admin users
export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated and has admin role
    const { authenticated, authorized, user } = await withAuth(request, ['admin']);
    
    if (!authenticated) {
      return unauthorized();
    }
    
    if (!authorized) {
      return forbidden();
    }
    
    const data: Provider = await request.json();
    
    // Validate required fields
    if (!data.name || !data.address || !data.email || !data.phone || !data.country || !data.category_id) {
      return NextResponse.json(
        { error: 'Name, address, email, phone, country, and category are required fields' }, 
        { status: 400 }
      );
    }
    
    const query = `
      INSERT INTO suppliers (
        name, address, city, state, postal_code, country, phone, email, 
        website, category_id, description, logo_url, founding_year, 
        employee_count, is_verified, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, FALSE, ?)
    `;
    
    const [result] = await pool.execute(query, [
      data.name,
      data.address,
      data.city || null,
      data.state || null,
      data.postal_code || null,
      data.country,
      data.phone,
      data.email,
      data.website || null,
      data.category_id,
      data.description || null,
      data.logo_url || null,
      data.founding_year || null,
      data.employee_count || null,
      user?.id || null
    ]);
    
    const insertId = (result as any).insertId;
    return NextResponse.json({ id: insertId, ...data }, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to create provider' }, { status: 500 });
  }
}