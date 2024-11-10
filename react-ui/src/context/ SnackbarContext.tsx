import React, { createContext, useContext, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define types for the Snackbar context state and methods
type Severity = "error" | "warning" | "info" | "success";

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

// Toast configurations for different severities
const toastConfig = {
  success: {
    toastMethod: toast.success,
    theme: "colored",
  },
  error: {
    toastMethod: toast.error,
    theme: "colored",
  },
  warning: {
    toastMethod: toast.warning,
    theme: "dark",
  },
  info: {
    toastMethod: toast.info,
    theme: "dark",
  },
};

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  // Show a new snackbar based on severity
  const showSnackbar = useCallback((message: string, severity: Severity) => {
    const { toastMethod, theme } = toastConfig[severity];
    toastMethod(message, {
      position: "bottom-right", // Toast position
      autoClose: 3000,
      hideProgressBar: false, // Show progress bar
      closeOnClick: true, // Allow closing the toast by clicking
      pauseOnHover: true, // Pause on hover
      draggable: true, // Allow dragging
      theme, // Dynamically set theme based on severity
    });
  }, []);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {/* ToastContainer to handle all toasts */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        theme="dark" // Default dark theme
      />
    </SnackbarContext.Provider>
  );
};
