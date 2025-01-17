"use client";
import * as React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store"; // Adjust path if necessary
import { clearNotification } from "@/store/slices/appSlice"; // Ensure this path is correct

const Notification: React.FC = () => {
  const dispatch = useDispatch();
  const notification = useSelector(
    (state: RootState) => state.app?.app?.notification ?? null
  );

  // Automatically close the snackbar after 3 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearNotification());
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  if (!notification) return null;

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={3000}
      onClose={() => dispatch(clearNotification())}
      anchorOrigin={{
        vertical: notification.vertical as "top" | "bottom",
        horizontal: notification.horizontal as "left" | "center" | "right",
      }}
    >
      <Alert
        onClose={() => dispatch(clearNotification())}
        severity={
          notification.severity as "error" | "warning" | "info" | "success"
        }
        sx={{ width: "100%" }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
