// src/components/ProviderCard.tsx
'use client';

import { Provider } from '@/lib/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';

interface ProviderCardProps {
  provider: Provider;
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const { isAdmin } = useAuth();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this provider?')) {
      try {
        setIsDeleting(true);
        const response = await fetch(`/api/providers/${provider.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete provider');
        }

        router.push('/providers');
      } catch (error) {
        console.error('Error deleting provider:', error);
        alert('Failed to delete provider');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {provider.logo_url && (
              <img 
                src={provider.logo_url} 
                alt={`${provider.name} logo`}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <h2 className="text-2xl font-bold text-gray-800">{provider.name}</h2>
          </div>
          {isAdmin && (
            <div className="flex space-x-3">
              <Link
                href={`/providers/${provider.id}/edit`}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors duration-200"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:bg-red-300 transition-colors duration-200"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-600">Email</h3>
            <p className="text-gray-800">{provider.email}</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-600">Phone</h3>
            <p className="text-gray-800">{provider.phone || '-'}</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-600">Website</h3>
            <p className="text-gray-800">
              {provider.website ? (
                <a href={provider.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {provider.website}
                </a>
              ) : '-'}
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-600">Founded</h3>
            <p className="text-gray-800">{provider.founding_year || '-'}</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-600">Employees</h3>
            <p className="text-gray-800">{provider.employee_count || '-'}</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-600">Rating</h3>
            <p className="text-gray-800">{provider.average_rating?.toFixed(1) || '-'} / 5.0</p>
          </div>
          <div className="md:col-span-2 space-y-1">
            <h3 className="text-sm font-semibold text-gray-600">Full Address</h3>
            <p className="text-gray-800">
              {provider.address}<br />
              {provider.city}, {provider.state || ''} {provider.postal_code || ''}<br />
              {provider.country}
            </p>
          </div>
          {provider.description && (
            <div className="md:col-span-2 space-y-1">
              <h3 className="text-sm font-semibold text-gray-600">Description</h3>
              <p className="text-gray-800">{provider.description}</p>
            </div>
          )}
          <div className="md:col-span-2 space-y-1">
            <h3 className="text-sm font-semibold text-gray-600">Status</h3>
            <p className="text-gray-800 flex items-center">
              {provider.is_verified ? (
                <>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                    Verified
                  </span>
                </>
              ) : (
                <>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-2">
                    Pending Verification
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
      
      {provider.products && provider.products.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Products</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {provider.products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-800">{product.name}</td>
                    <td className="px-4 py-3 text-gray-800">{product.description || '-'}</td>
                    <td className="px-4 py-3 text-right text-gray-800">
                      {product.price ? `$${product.price.toFixed(2)}` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-end">
          <Link
            href="/providers"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            Back to List
          </Link>
        </div>
      </div>
    </div>
  );
}