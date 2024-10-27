import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { navLinks } from "../../config/top-navigation-config"; // Navbar items
import { menuLinks } from "../../config/menu-navigation-config"; // Menu items
import { NavItem } from "../../config/types"; // Import NavItem type

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
      setActiveSubmenu(null);
    }
  };

  const handleSubmenuToggle = (index: number) => {
    setActiveSubmenu((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="header-container" ref={headerRef}>
      <nav className="navbar">
        <div
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={toggleSidebar}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`menu ${isOpen ? "show" : ""}`}>
          <ul>
            {menuLinks.map((link: NavItem, index: number) => (
              <li key={index}>
                <div onClick={() => handleSubmenuToggle(index)}>
                  {link.path ? (
                    <Link to={link.path} onClick={toggleSidebar}>
                      {link.label}
                      {link.submenu && <span className="indicator"> ➤ </span>}
                    </Link>
                  ) : (
                    <span>
                      {link.label}
                      {link.submenu && <span className="indicator"> ➤ </span>}
                    </span>
                  )}
                </div>
                {link.submenu && activeSubmenu === index && (
                  <ul className="submenu">
                    {link.submenu.map((subLink: NavItem, subIndex: number) => (
                      <li key={subIndex}>
                        {subLink.path ? (
                          <Link to={subLink.path} onClick={toggleSidebar}>
                            {subLink.label}
                          </Link>
                        ) : (
                          <span>{subLink.label}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <ul className="right-menu">
          {navLinks.map((link: NavItem, index: number) => (
            <li key={index}>
              {link.path ? (
                <Link to={link.path}>{link.label}</Link>
              ) : (
                <span>{link.label}</span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Header;