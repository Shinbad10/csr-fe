import { NextResponse } from 'next/server';
import axios from 'axios';
import { serialize } from 'cookie';
import { jwtVerify } from 'jose'; // Thay đổi từ jsonwebtoken sang jose
import { apiUrl } from '../../urlAPI';


export async function POST(req: Request) {
  const { Username, Password, Remember } = await req.json();

  try {
    // Gửi request đến API login của backend
    const response = await axios.post(apiUrl.base+apiUrl.auth.login, {
        Username,
        Password,
        Remember
    });
    const data = response.data
    if(data.accessToken){
      const { accessToken, refreshToken } = data;
    // Lưu token vào cookie
    const accessCookie = serialize('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60, // 1 giờ
    });

    const refreshCookie = serialize('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 ngày
    });
    // Tạo cookie user
    const { payload } = await jwtVerify(accessToken, new TextEncoder().encode(process.env.JWT_SECRET!));
    // Lưu thông tin người dùng vào cookie
    const userCookie = serialize('user', JSON.stringify(payload), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60, // 1 giờ
    });
    const res = NextResponse.json({ message: 'Login successful' });
    res.headers.set('Set-Cookie', accessCookie);
    res.headers.append('Set-Cookie', refreshCookie);
    res.headers.append('Set-Cookie', userCookie);

    // Gửi cookie về client
    return res;
    }
    return NextResponse.json(
      { message: data.response?.message  },
      { status: 401 }
    ); 
  } 
  catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || 'Login failed' },
      { status: 401 }
    );
  }
}
