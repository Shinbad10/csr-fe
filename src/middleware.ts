import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // Chuyển sang jose để quản lý token
import { adminPages } from './routes';

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value; // Lấy token từ cookies
  const user = req.cookies.get('user')?.value;
  const { pathname } = req.nextUrl;

  // Nếu không có token và không ở trang login -> chuyển hướng về login
  if (!accessToken) {
    if (pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
  }

  // Nếu đã đăng nhập mà vào `/login`, chuyển về trang chủ
  if (pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  let userObj = null;

  // Xử lý parse user object từ cookie (nếu có)
  try {
    userObj = user ? JSON.parse(user) : null;
  } catch (err) {
    console.error(`[Middleware] Error parsing user cookie:`, err);
  }
  const isAdmin = userObj.funcData.some((item: any) => item.MaChucNang <3)
  if (
    adminPages.some((item: any) => item.path === pathname) &&
    (!Array.isArray(userObj?.funcData) ||!isAdmin)
  ) {
    console.log(`[Middleware] Unauthorized access to /employees, redirecting to /`);
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Xác thực token với jose
  try {
    await jwtVerify(accessToken, new TextEncoder().encode(process.env.JWT_SECRET!));
    return NextResponse.next(); // Token hợp lệ
  } catch (err) {
    console.log('[Middleware] Token invalid or expired:', err);
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.set('accessToken', '', { path: '/', httpOnly: true, secure: true, maxAge: 0 });
    return response;
  }
}

export const config = {
  // Áp dụng middleware cho mọi trang trừ các tệp tĩnh và các route cụ thể
  matcher: ['/((?!_next/static|_next/image|favicon.ico|auth|api|images).*)'],
};
