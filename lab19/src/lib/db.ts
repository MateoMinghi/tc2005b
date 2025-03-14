// src/lib/db.ts
import mysql from 'mysql2/promise';
import { Provider, User, UserRole } from './types';
import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcryptjs';

interface ProviderRow extends RowDataPacket {
  id: number;
  name: string;
  address: string;
  city: string;
  state?: string;
  postal_code?: string;
  country: string;
  phone: string;
  email: string;
  website?: string;
  category_id: number;
  description?: string;
  logo_url?: string;
  founding_year?: number;
  employee_count?: number;
  average_rating?: number;
  is_verified?: boolean;
  created_by?: number;
}

interface UserRow extends RowDataPacket {
  id: number;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'supplier_discovery',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function getProviders(): Promise<Provider[]> {
  try {
    const [rows] = await pool.query<ProviderRow[]>('SELECT * FROM suppliers');
    return rows;
  } catch (error) {
    console.error('Error fetching providers:', error);
    return [];
  }
}

// User authentication and management functions

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const [rows] = await pool.query<UserRow[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function getUserById(id: number): Promise<User | null> {
  try {
    const [rows] = await pool.query<UserRow[]>(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return null;
  }
}

export async function createUser(username: string, email: string, password: string, role: UserRole = 'user'): Promise<User | null> {
  try {
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, role]
    );
    
    const insertId = (result as any).insertId;
    
    return {
      id: insertId,
      username,
      email,
      role,
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export default pool;