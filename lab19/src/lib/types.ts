// src/lib/types.ts
export interface Provider {
    id?: number;
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
    created_at?: string;
    updated_at?: string;
    products?: Product[];
}

export interface Product {
    id?: number;
    provider_id: number;
    name: string;
    description?: string;
    price?: number;
    created_at?: string;
    updated_at?: string;
}

export type ProviderFormData = Omit<Provider, 'id' | 'created_at' | 'updated_at' | 'products' | 'average_rating' | 'is_verified'>;

// New User types for RBAC
export interface User {
    id?: number;
    username: string;
    email: string;
    password?: string; // Only included in registration/login requests
    role: UserRole;
    created_at?: string;
    updated_at?: string;
}

export type UserRole = 'user' | 'admin';

export interface AuthResponse {
    user: Omit<User, 'password'>;
    token: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}