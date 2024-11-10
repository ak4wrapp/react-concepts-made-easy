import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { navLinks } from "./config/top-navigation-config"; // Navigation links
import { menuLinks } from "./config/menu-navigation-config"; // Menu links
import Home from "./components/generic/home"; // Import Home component
import Header from "./components/generic/header/header"; // Header component
import { useNetworkStatus } from "./components/learning/custom-hooks/use-network-status";
import { useSnackbar } from "./context/ SnackbarContext";

// Function to recursively get routes from navLinks and menuLinks
const renderRoutes = (links: any[]) => {
  return links.map((link) => {
    if (link.path && link.component) {
      const Component = link.component;
      return <Route key={link.path} path={link.path} element={<Component />} />;
    }

    if (link.submenu) {
      return renderRoutes(link.submenu);
    }

    return null;
  });
};

function App() {
  const isOnline = useNetworkStatus(); // Track network status
  const { showSnackbar } = useSnackbar(); // Access showSnackbar method from context
  const [prevIsOnline, setPrevIsOnline] = useState<boolean>(isOnline); // Track previous network status

  useEffect(() => {
    if (isOnline !== prevIsOnline) {
      // If the network status has changed (from online to offline or vice versa)
      if (isOnline) {
        // Only show toast if we are reconnected (offline to online)
        showSnackbar("You are back online!", "success");
      } else {
        // Only show toast if we got disconnected (online to offline)
        showSnackbar("You are offline. Please check your connection.", "error");
      }

      // Update previous network status
      setPrevIsOnline(isOnline);
    }
  }, [isOnline, prevIsOnline, showSnackbar]); // Re-run this effect when the network status changes

  return (
    <Router>
      <div>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} /> {/* Default route to Home */}
            {renderRoutes([...navLinks, ...menuLinks])}{" "}
            {/* Dynamic route rendering */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
