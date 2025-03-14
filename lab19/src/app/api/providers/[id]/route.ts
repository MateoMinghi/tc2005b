import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { Provider } from '@/lib/types';
import { withAuth, forbidden, unauthorized } from '@/lib/auth';

interface Params {
  params: {
    id: string
  }
}

// GET /api/providers/[id] - Available to all authenticated users
export async function GET(request: NextRequest, { params }: Params) {
  try {
    // ...existing GET code...
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch provider' }, { status: 500 });
  }
}

// PUT /api/providers/[id] - Only available to admin users
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    // ...existing PUT code...
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to update provider' }, { status: 500 });
  }
}

// DELETE /api/providers/[id] - Only available to admin users
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    // Check if user is authenticated and has admin role
    const { authenticated, authorized } = await withAuth(request, ['admin']);
    
    if (!authenticated) {
      return unauthorized();
    }
    
    if (!authorized) {
      return forbidden();
    }
    
    // Await the params before extracting properties
    const { id } = await params;
    
    const [result] = await pool.execute(
      'DELETE FROM suppliers WHERE id = ?',
      [id]
    );
    
    const affectedRows = (result as any).affectedRows;
    
    if (affectedRows === 0) {
      return NextResponse.json({ error: 'Provider not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Provider deleted successfully' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to delete provider' }, { status: 500 });
  }
}