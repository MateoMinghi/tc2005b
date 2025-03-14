// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, logout, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleLogout = async () => {
    await logout();
    // Close mobile menu if open
    setIsMenuOpen(false);
  };
  
  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl">
              Provider Management
            </Link>
            <div className="hidden md:block ml-10 flex items-baseline space-x-4">
              <Link 
                href="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === '/' 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/providers" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname.startsWith('/providers') && !pathname.includes('/add') && !pathname.includes('/edit')
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                Providers
              </Link>
              
              {/* Admin-only navigation links */}
              {isAdmin && (
                <Link 
                  href="/providers/add" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/providers/add'
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Add Provider
                </Link>
              )}
            </div>
          </div>
          
          {/* Authentication links */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {!loading && (
                <>
                  {user ? (
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-300">
                        {user.username} {isAdmin && <span className="ml-1 text-xs px-2 py-1 bg-blue-600 rounded-full">Admin</span>}
                      </span>
                      <button
                        onClick={handleLogout}
                        className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Link
                        href="/login"
                        className={`px-3 py-2 rounded-md text-sm font-medium ${
                          pathname === '/login' 
                            ? 'bg-gray-900 text-white' 
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className={`px-3 py-2 rounded-md text-sm font-medium ${
                          pathname === '/register'
                            ? 'bg-gray-900 text-white' 
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === '/'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/providers"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname.startsWith('/providers') && !pathname.includes('/add') && !pathname.includes('/edit')
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Providers
            </Link>
            
            {/* Admin-only mobile links */}
            {isAdmin && (
              <Link
                href="/providers/add"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === '/providers/add'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Add Provider
              </Link>
            )}
            
            {/* Authentication mobile links */}
            {!loading && (
              <>
                {user ? (
                  <div>
                    <div className="px-3 py-2 text-sm text-gray-300">
                      {user.username} {isAdmin && <span className="ml-1 text-xs px-2 py-1 bg-blue-600 rounded-full">Admin</span>}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        pathname === '/login'
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        pathname === '/register'
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}