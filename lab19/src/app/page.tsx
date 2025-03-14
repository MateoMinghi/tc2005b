// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="py-10">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Provider Management System
        </h1>
        <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto">
          A comprehensive system to manage your providers and their products.
          Perform CRUD operations easily with an intuitive interface.
        </p>
      </header>

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Features</h2>
          
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Add, view, edit, and delete provider information</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Track provider details including name, contact information, and address</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Associate products with providers</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Search functionality to quickly find providers</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Responsive design that works on desktop and mobile</span>
            </li>
          </ul>
          
          <div className="mt-8">
            <Link 
              href="/providers" 
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded text-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}