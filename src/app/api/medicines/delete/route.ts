import { NextResponse } from 'next/server';
import { apiUrl } from '@/app/api/urlAPI'; // Ensure correct path and case sensitivity
import { createServerApi } from "@/app/api/apiClient";
import { cookies } from "next/headers";

export async function POST(req: Request) { // Use POST for bulk delete (if it's intended to be POST)
  try {
    const { selectedRows } = await req.json(); // Get the selected row IDs
    const cookie = await cookies();
    const api = createServerApi(cookie as any);

    // Wait for all delete requests to complete using Promise.all
    await Promise.all(
      selectedRows.map(async (row: any) => {
        const response = await api.delete(`${apiUrl.medicines}/${row}`);
        if (response.status !== 200) {
          throw new Error(`Failed to delete row with ID: ${row}`);
        }
      })
    );

    return NextResponse.json({ message: 'Delete successful' });

  } catch (error: any) {
    console.error("Error:", error); // Log error for debugging
    return NextResponse.json(
      { message: error.message || 'An error occurred' },
      { status: 500 }
    );
  }
}
