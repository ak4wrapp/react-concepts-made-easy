// src/navConfig.ts

import About from "../components/generic/about";
import Contact from "../components/generic/contact";
import { NavItem } from "../types/nav-item";

export const navLinks: NavItem[] = [
  {
    label: "About",
    path: "/about",
    component: About, // About component
  },
  {
    label: "Contact",
    path: "/contact",
    component: Contact, // Contact component
  },
];
