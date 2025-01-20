import { NextResponse } from 'next/server';
import { apiUrl } from '@/app/api/urlAPI'; // Ensure the correct path and case sensitivity
import { createServerApi } from "@/app/api/apiClient";
import { cookies } from "next/headers";


export async function POST(req: Request) { // Use PUT for updating
  try {
    const {row} = await req.json(); // Get the edited row data
    const cookie = await cookies();
    const api = createServerApi(cookie as any);
    // Perform the PUT request
    const response =  await api.get(`${apiUrl.functions}/${row.MaNV}`);
    const data = response.data;
    return NextResponse.json({ message: 'successful',data:data });
  } catch (error: any) {
    console.error("Error:", error); // Log error for debugging
    return NextResponse.json(
      { message: error.response?.data?.message || 'An error occurred' },
      { status: 500 }
    );
  }
}
