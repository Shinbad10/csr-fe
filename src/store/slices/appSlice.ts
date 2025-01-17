import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Notification {
  open:boolean,
  message: string;
  severity: string;
  vertical: string;
  horizontal: string;
}


interface App {
  loadingProgress: boolean;
  notification: Notification 
}

interface AppState {
  app: App | null; // Thông tin người dùng sẽ là đối tượng hoặc null nếu chưa có
}

const initialState: AppState = {
    app: { 
        loadingProgress: true,
        notification:{
            open:false,
            message: "",
            severity: "success",
            vertical: "top",
            horizontal: "right",
        }
    }, 
}

export const appSlice  = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setApp: (state, action: PayloadAction<App>) => {
      state.app = action.payload; // Lưu thông tin người dùng vào Redux state
    },
    clearApp: (state) => {
      state.app = null; // Xoá thông tin người dùng khi logout
    },
    setNotification: (state, action: PayloadAction<Notification>) => {
      if (state.app) {
        state.app.notification = action.payload;
      }
    },
    clearNotification: (state) => {
      if (state.app) {
        state.app.notification = {
          open: false,
          message: "",
          severity: "success",
          vertical: "top",
          horizontal: "right",
        };
      }
    },
  },
})

export const { setApp, clearApp, setNotification, clearNotification } = appSlice.actions;

export default appSlice.reducer
