// redux/userSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  MaNV: number;
  HoTenNV: string;
  NgaySinh: string | null;
  GioiTinh: string | null;
  DiaChi: string | null;
  DienThoai: string | null;
  ChucVu: string | null;
  ChucDanh: string | null;
  Username: string;
  iat: number;
  exp: number;
}

interface UserState {
  user: User | null; // Thông tin người dùng sẽ là đối tượng hoặc null nếu chưa có
}

const initialState: UserState = {
  user: null, // Mặc định là không có người dùng
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload; // Lưu thông tin người dùng vào Redux state
    },
    clearUser: (state) => {
      state.user = null; // Xoá thông tin người dùng khi logout
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer
