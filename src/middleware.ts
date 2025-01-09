import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // Thay đổi từ jsonwebtoken sang jose

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;
  const { pathname } = req.nextUrl
  if (!accessToken) {
    if (pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next(); 
  }
  if (pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url));
  }
 
  try {
    await jwtVerify(accessToken, new TextEncoder().encode(process.env.JWT_SECRET!));
    return NextResponse.next();
  } catch (err) {
    console.log('Token invalid or expired:', err);
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.headers.append(
      'Set-Cookie',
      `accessToken=; Path=/; HttpOnly; Secure; Max-Age=0`
    );
    return response;
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|auth|api|images).*)'], // Điều kiện áp dụng middleware
};

