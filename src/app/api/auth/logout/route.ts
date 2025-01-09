import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const cookies = req.headers.get('cookie');

    const response = NextResponse.json({ message: 'All cookies cleared' });

    if (cookies) {
      // Tách tất cả các cookie thành mảng
      const cookieArray = cookies.split(';');
      // Xóa từng cookie bằng cách đặt `Max-Age=0`
      cookieArray.forEach((cookie) => {
        const cookieName = cookie.split('=')[0].trim(); // Lấy tên cookie
        response.headers.append(
          'Set-Cookie',
          `${cookieName}=; Path=/; HttpOnly; Secure; Max-Age=0`
        );
      });
    }
    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || 'LogOut failed' },
      { status: 401 }
    );
  }
}
