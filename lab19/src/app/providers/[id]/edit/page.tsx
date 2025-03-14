// src/app/providers/[id]/edit/page.tsx
import { notFound } from 'next/navigation';
import ProviderForm from '@/components/ProviderForm';
import pool from '@/lib/db';
import { Provider } from '@/lib/types';

export const dynamic = 'force-dynamic';

interface EditProviderPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getProvider(id: string): Promise<Provider | null> {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM suppliers WHERE id = ?',
      [id]
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

export default async function EditProviderPage({ params }: EditProviderPageProps) {
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
          Edit Provider: {provider.name}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Update provider information
        </p>
      </div>
      
      <ProviderForm initialData={provider} isEditing={true} />
    </div>
  );
}