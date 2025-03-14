// src/app/layout.tsx
import Navbar from '@/components/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '@/lib/AuthContext';

export const metadata: Metadata = {
  title: 'Provider Management System',
  description: 'A system to manage provider data with CRUD operations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <AuthProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}