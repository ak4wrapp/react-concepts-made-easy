import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { navLinks } from "./config/top-navigation-config"; // Navigation links
import { menuLinks } from "./config/menu-navigation-config"; // Menu links
import Home from "./components/generic/home"; // Import Home component
import "./App.css";
import Header from "./components/generic/header/header";

// Function to recursively get routes from navLinks and menuLinks
const renderRoutes = (links) => {
  return links.map((link) => {
    if (link.path && link.component) {
      return (
        <Route key={link.path} path={link.path} element={<link.component />} />
      );
    }

    // Handle submenu recursively
    if (link.submenu) {
      return renderRoutes(link.submenu);
    }

    return null;
  });
};

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} /> {/* Default route to Home */}
            {renderRoutes([...navLinks, ...menuLinks])}{" "}
            {/* Dynamic route rendering from navLinks and menuLinks */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
