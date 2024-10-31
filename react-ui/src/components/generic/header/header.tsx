import React, { useState, useEffect, useRef, useCallback } from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import { menuLinks } from "../../../config/menu-navigation-config";
import { navLinks } from "../../../config/top-navigation-config";
import { NavItem } from "../../../types/nav-item";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      headerRef.current &&
      !headerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      setActiveSubmenu(null);
    }
  };

  const handleSubmenuMouseEnter = (index: number) => {
    setActiveSubmenu(index);
  };

  const handleMenuItemClick = useCallback(() => {
    setIsOpen(false);
    setActiveSubmenu(null);
  }, []);

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
              <li
                key={index}
                onMouseEnter={() => handleSubmenuMouseEnter(index)}
              >
                <div aria-expanded={activeSubmenu === index}>
                  {link.path ? (
                    <NavLink to={link.path} onClick={handleMenuItemClick}>
                      {link.label}
                      {link.submenu && <span className="indicator"> ➤ </span>}
                    </NavLink>
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
                        <div>
                          {subLink.path ? (
                            <NavLink
                              to={subLink.path}
                              onClick={handleMenuItemClick}
                            >
                              {subLink.label}
                              {subLink.submenu && (
                                <span className="indicator"> ➤ </span>
                              )}
                            </NavLink>
                          ) : (
                            <span>
                              {subLink.label}
                              {subLink.submenu && (
                                <span className="indicator"> ➤ </span>
                              )}
                            </span>
                          )}
                        </div>
                        {subLink.submenu && (
                          <ul className="submenu">
                            {subLink.submenu.map(
                              (childLink: NavItem, childIndex: number) => (
                                <li key={childIndex}>
                                  {childLink.path ? (
                                    <NavLink
                                      to={childLink.path}
                                      onClick={handleMenuItemClick}
                                    >
                                      {childLink.label}
                                    </NavLink>
                                  ) : (
                                    <span>{childLink.label}</span>
                                  )}
                                </li>
                              )
                            )}
                          </ul>
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
                <NavLink to={link.path} onClick={handleMenuItemClick}>
                  {link.label}
                </NavLink>
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
