// src/app/providers/[id]/page.tsx
import { notFound } from 'next/navigation';
import ProviderCard from '@/components/ProviderCard';
import pool from '@/lib/db';
import { Provider } from '@/lib/types';

export const dynamic = 'force-dynamic';

type Params = { id: string };

interface ProviderDetailPageProps {
  params: Promise<Params>;
}

async function getProvider(providerId: string): Promise<Provider | null> {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM suppliers WHERE id = ?',
      [providerId]
    );
    
    const providers = rows as Provider[];
    if (providers.length === 0) {
      return null;
    }
    
    return providers[0];
  } catch (error) {
    console.error('Failed to fetch provider:', error);
    return null;
  }
}

export default async function ProviderDetailPage({ params }: ProviderDetailPageProps) {
  const resolvedParams = await Promise.resolve(params);
  
  if (!resolvedParams?.id) {
    notFound();
  }

  const provider = await getProvider(resolvedParams.id);
  
  if (!provider) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {provider.name}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          View and manage provider details
        </p>
      </div>
      
      <ProviderCard provider={provider} />
    </div>
  );
}