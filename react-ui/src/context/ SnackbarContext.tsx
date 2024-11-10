import React, { createContext, useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import styles

// Define types for the Snackbar context state and methods
type Severity = "error" | "warning" | "info" | "success"; // Severity levels

interface SnackbarContextProps {
  showSnackbar: (message: string, severity: Severity) => void;
}

interface SnackbarProviderProps {
  children: React.ReactNode;
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

// SnackbarProvider Component
export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  // Show a new snackbar based on severity
  const showSnackbar = (message: string, severity: Severity) => {
    if (severity === "success") {
      toast.success(message, {
        position: "bottom-right", // Toast position
        autoClose: 5000, // Auto close after 5 seconds
        hideProgressBar: false, // Show progress bar
        closeOnClick: true, // Allow closing the toast by clicking
        pauseOnHover: true, // Pause on hover
        draggable: true, // Allow dragging
        theme: "colored", // Use the "colored" theme for success
      });
    } else if (severity === "error") {
      toast.error(message, {
        position: "bottom-right", // Toast position
        autoClose: 5000, // Auto close after 5 seconds
        hideProgressBar: false, // Show progress bar
        closeOnClick: true, // Allow closing the toast by clicking
        pauseOnHover: true, // Pause on hover
        draggable: true, // Allow dragging
        theme: "colored", // Use the "colored" theme for error
      });
    } else {
      toast(message, {
        position: "bottom-right", // Toast position
        autoClose: 5000, // Auto close after 5 seconds
        hideProgressBar: false, // Show progress bar
        closeOnClick: true, // Allow closing the toast by clicking
        pauseOnHover: true, // Pause on hover
        draggable: true, // Allow dragging
        theme: "dark", // Use dark theme for generic toasts
      });
    }
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      {/* ToastContainer to handle all toasts */}
      <ToastContainer
        position="bottom-right" // Set the position to bottom-right
        autoClose={5000} // Toast auto close time (5 seconds)
        hideProgressBar={false} // Show progress bar
        newestOnTop={false} // Don't show the newest on top
        closeOnClick={true} // Allow closing the toast by clicking
        rtl={false} // Disable right-to-left text
        pauseOnFocusLoss={true} // Pause toast on window focus loss
        draggable={true} // Allow dragging
        pauseOnHover={true} // Pause toast on hover
        theme="dark" // Default dark theme for all toasts
      />
    </SnackbarContext.Provider>
  );
};
