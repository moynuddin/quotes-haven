// src/ConnectionStatus.js
import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Connection = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const updateOnlineStatus = () => {
      const onlineStatus = navigator.onLine;
      console.log(onlineStatus);
      setIsOnline(onlineStatus);
      setSnackbarMessage(
        onlineStatus
          ? "You are back online!"
          : "You are offline. Please check your internet connection."
      );
      setSnackbarOpen(true);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={isOnline ? "success" : "error"}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Connection;
