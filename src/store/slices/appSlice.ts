import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface App {
  loadingProgress: boolean;
}

interface AppState {
  app: App | null; // Thông tin người dùng sẽ là đối tượng hoặc null nếu chưa có
}

const initialState: AppState = {
    app: { loadingProgress: true }, 
}

export const userSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setApp: (state, action: PayloadAction<App>) => {
      state.app = action.payload; // Lưu thông tin người dùng vào Redux state
    },
    clearApp: (state) => {
      state.app = null; // Xoá thông tin người dùng khi logout
    },
  },
})

export const { setApp, clearApp } = userSlice.actions

export default userSlice.reducer
