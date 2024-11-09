// src/context/SnackbarContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

// Define types for the Snackbar context state and methods
type Severity = "error" | "warning" | "info" | "success"; // Severity levels

interface SnackbarContextProps {
  showSnackbar: (message: string, severity: Severity) => void;
  closeSnackbar: () => void;
}

interface SnackbarItem {
  message: string;
  severity: Severity;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined
);

// Custom hook to access SnackbarContext
export const useSnackbar = (): SnackbarContextProps => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

// Type for SnackbarProvider props (children prop)
interface SnackbarProviderProps {
  children: React.ReactNode;
}

// SnackbarProvider Component
export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const [snackbarQueue, setSnackbarQueue] = useState<SnackbarItem[]>([]); // Queue of snackbars
  const [currentSnackbar, setCurrentSnackbar] = useState<SnackbarItem | null>(
    null
  ); // Current snackbar being displayed

  // Show a new snackbar
  const showSnackbar = (message: string, severity: Severity) => {
    setSnackbarQueue((prevQueue) => [...prevQueue, { message, severity }]);
  };

  // Close the current snackbar
  const closeSnackbar = () => {
    setCurrentSnackbar(null); // Mark current snackbar as closed
  };

  // Effect to manage sequential snackbars
  useEffect(() => {
    if (currentSnackbar === null && snackbarQueue.length > 0) {
      const [nextSnackbar, ...rest] = snackbarQueue; // Get the next snackbar
      setCurrentSnackbar(nextSnackbar); // Show the next snackbar
      setSnackbarQueue(rest); // Remove it from the queue
    }
  }, [currentSnackbar, snackbarQueue]); // Dependencies are currentSnackbar and snackbarQueue

  // Return the context provider with the showSnackbar function available
  return (
    <SnackbarContext.Provider value={{ showSnackbar, closeSnackbar }}>
      {children}
      {currentSnackbar && (
        <Snackbar
          open={true}
          autoHideDuration={2000}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // Bottom-right position
        >
          <Alert onClose={closeSnackbar} severity={currentSnackbar.severity}>
            {currentSnackbar.message}
          </Alert>
        </Snackbar>
      )}
    </SnackbarContext.Provider>
  );
};
