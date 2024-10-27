import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { navLinks } from "./config/top-navigation-config"; // Navigation links
import { menuLinks } from "./config/menu-navigation-config"; // Menu links
import Header from "./components/header/header";
import Home from "./components/home"; // Import Home component
import './App.css';

// Function to get routes from navLinks and menuLinks
const renderRoutes = () => {
  const routes = [...navLinks, ...menuLinks]; // Combine navLinks and menuLinks

  return (
    <>
      {routes.map((link) => {
        if (link.path && link.component) {
          return <Route key={link.path} path={link.path} element={<link.component />} />;
        }

        // Handle submenu
        if (link.submenu) {
          return link.submenu.map((subLink) => (
            subLink.path && subLink.component ? (
              <Route key={subLink.path} path={subLink.path} element={<subLink.component />} />
            ) : null
          ));
        }

        return null;
      })}
    </>
  );
};

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} /> {/* Default route to Home */}
            {renderRoutes()} {/* Dynamic route rendering from navLinks and menuLinks */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
