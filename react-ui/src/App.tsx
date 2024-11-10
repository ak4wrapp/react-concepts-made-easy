// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { navLinks } from "./config/top-navigation-config"; // Navigation links
import { menuLinks } from "./config/menu-navigation-config"; // Menu links
import Home from "./components/generic/home"; // Import Home component
import Header from "./components/generic/header/header"; // Header component
import "./App.css";
import { SnackbarProvider } from "./context/ SnackbarContext";
// import "./styles/toast.css";

// Function to recursively get routes from navLinks and menuLinks
const renderRoutes = (links) => {
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
  return (
    <SnackbarProvider>
      <Router>
        <div>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />{" "}
              {/* Default route to Home */}
              {renderRoutes([...navLinks, ...menuLinks])}{" "}
              {/* Dynamic route rendering from navLinks and menuLinks */}
            </Routes>
          </div>
        </div>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
