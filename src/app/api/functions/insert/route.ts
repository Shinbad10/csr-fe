import { NextResponse } from 'next/server';
import { apiUrl } from '@/app/api/urlAPI'; // Ensure the correct path and case sensitivity
import { createServerApi } from "@/app/api/apiClient";
import { cookies } from "next/headers";


export async function POST(req: Request) {
  const { functionByEmployee, MaNV}  = await req.json();
  const cookie = await cookies()
  const api = createServerApi(cookie as any);
  if (!functionByEmployee || !Array.isArray(functionByEmployee) || !MaNV) {
    return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
  }
  try {
     // Execute all requests concurrently
    const results = await Promise.allSettled(
      functionByEmployee.map(async (funcByEmp: any) => {
        return api.post(`${apiUrl.functions}`, {
          MaNV,
          MaChucNang: funcByEmp.MaChucNang,
        });
      })
    );
      // Handle results and errors
      const successes = results.filter((res) => res.status === 'fulfilled');
      const failures = results.filter((res) => res.status === 'rejected');
  
      // Log errors if needed
      if (failures.length > 0) {
        console.error('Failed requests:', failures);
      }
      // Return response
      return NextResponse.json({
        message: 'Process completed',
        successes: successes.length,
        failures: failures.length,
      });
  } catch (error: any) {
    console.error('Error in POST:', error);
    return NextResponse.json(
      { message: error.message || 'An error occurred' },
      { status: 500 }
    );
  }
}
