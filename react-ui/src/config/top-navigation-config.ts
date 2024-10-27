// src/navConfig.ts

import About from "../components/about";
import Contact from "../components/contact";
import { NavItem } from "./types";

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

// You can still define routes separately if needed, but this structure keeps it organized.
