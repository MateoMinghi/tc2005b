// src/app/providers/add/page.tsx
import ProviderForm from '@/components/ProviderForm';

export default function AddProviderPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Add Provider
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Add a new provider to your system
        </p>
      </div>
      
      <ProviderForm />
    </div>
  );
}