import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from './src/lib/auth';
import createIntlMiddleware from 'next-intl/middleware';

// First, create the internationalization middleware
const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en'
});

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip authentication for public routes and static files
  const isPublicRoute = 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/public') || 
    pathname === '/' ||
    pathname === '/api/auth/login' ||
    pathname === '/api/auth/register';
    
  // For providers API, GET is public but other methods require auth
  const isProvidersListRoute = pathname === '/api/providers';
  if (isProvidersListRoute && request.method === 'GET') {
    return NextResponse.next();
  }

  // Routes that require admin role
  const adminRoutes = [
    '/api/providers', // For POST, PUT, DELETE methods
    '/providers/add',
    '/providers/[id]/edit',
  ];
  
  // Check if the current route requires admin privileges
  const requiresAdmin = adminRoutes.some(route => {
    if (route.includes('[id]')) {
      // Handle dynamic routes with ID parameters
      const pattern = new RegExp(route.replace('[id]', '[^/]+'));
      return pattern.test(pathname);
    }
    return pathname === route;
  });
  
  // For admin-only API routes, check admin role
  if (pathname.startsWith('/api/') && !isPublicRoute) {
    if (requiresAdmin) {
      const { authenticated, authorized } = await withAuth(request, ['admin']);
      
      if (!authenticated) {
        return new NextResponse(
          JSON.stringify({ message: 'Authentication required' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      if (!authorized) {
        return new NextResponse(
          JSON.stringify({ message: 'Admin access required' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } else {
      // For other protected API routes, just check if authenticated
      const { authenticated } = await withAuth(request);
      
      if (!authenticated) {
        return new NextResponse(
          JSON.stringify({ message: 'Authentication required' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }
    return NextResponse.next();
  }
  
  // For non-API routes, apply the internationalization middleware
  return intlMiddleware(request);
}

// Configure which routes should be handled by the middleware
export const config = {
  // Skip static files, but include both API and page routes
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)', '/api/:path*']
};