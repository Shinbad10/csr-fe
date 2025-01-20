import { NextResponse } from 'next/server';
import { apiUrl } from '@/app/api/urlAPI'; // Ensure the correct path and case sensitivity
import { createServerApi } from "@/app/api/apiClient";
import { cookies } from "next/headers";


export async function POST(req: Request) {
  const {newRow}  = await req.json();
  const cookie = await cookies()
  const api = createServerApi(cookie as any);
  try {
     const response = await api.post(apiUrl.medicines, {
      TenThuoc: newRow.TenThuoc,
      DVT: newRow.DVT,
      CachDung: newRow.CachDung,
      DuongDung: newRow.DuongDung,
      DVSD: newRow.DVSD,
        });
    const data = response.data;
    const res = NextResponse.json({ message: 'successful',data:data });
    return res;
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || 'Login failed' },
      { status: 401 }
    );
  }
}
