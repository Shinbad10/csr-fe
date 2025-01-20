import { NextResponse } from 'next/server';
import { apiUrl } from '@/app/api/urlAPI'; // Ensure correct path and case sensitivity
import { createServerApi } from "@/app/api/apiClient";
import { cookies } from "next/headers";

export async function POST(req: Request) { // Use PUT for updating
  try {
    const {updatedRow} = await req.json(); // Get the edited row data
    const cookie = await cookies();
    const api = createServerApi(cookie as any);
console.log(updatedRow)
    // Perform the PUT request
    await api.put(`${apiUrl.medicines}/${updatedRow.MaThuoc}`, {
      TenThuoc: updatedRow.TenThuoc,
      DVT: updatedRow.DVT,
      CachDung: updatedRow.CachDung,
      DuongDung: updatedRow.DuongDung,
    });
    // Send success response
    return NextResponse.json({ message: 'Update successful' });

  } catch (error: any) {
    console.error("Error:", error); // Log error for debugging
    return NextResponse.json(
      { message: error.response?.data?.message || 'An error occurred' },
      { status: 500 }
    );
  }
}
