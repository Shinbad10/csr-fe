import { NextResponse } from 'next/server';
import axios from 'axios';
import { serialize, parse } from 'cookie';

export async function POST(req: Request) {
  const cookies = parse(req.headers.get('cookie') || '');
  const refreshToken = cookies.refreshToken;

  if (!refreshToken) {
    return NextResponse.json({ message: 'Refresh token missing' }, { status: 401 });
  }

  try {
    const response = await axios.post('https://your-backend.com/api/refresh', {
      refreshToken,
    });

    const { accessToken } = response.data;

    const accessCookie = serialize('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60, // 1 giờ
    });

    const res = NextResponse.json({ message: 'Token refreshed' });
    res.headers.set('Set-Cookie', accessCookie);
    return res;
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || 'Token refresh failed' },
      { status: 401 }
    );
  }
}
