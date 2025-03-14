// src/app/providers/page.tsx
import ProviderList from '@/components/ProviderList';
import { Provider } from '@/lib/types';
import { headers } from 'next/headers';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

async function getProviders(): Promise<Provider[]> {
  try {
    const [rows] = await pool.query('SELECT * FROM suppliers ORDER BY name ASC');
    return rows as Provider[];
  } catch (error) {
    console.error('Failed to fetch providers:', error);
    return [];
  }
}

export default async function ProvidersPage() {
  const providers = await getProviders();
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Providers
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage your providers and their information
        </p>
      </div>

      <ProviderList providers={providers} />
    </div>
  );
}