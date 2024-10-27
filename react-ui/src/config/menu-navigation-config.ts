import Home from "../components/home";
import NetworkStatusCheck from "../components/network-status-check/network-status-check";
import Todos from "../components/todos/todos";
import { NavItem } from "./types";

export const menuLinks: NavItem[] = [
  {
    label: "Home",
    path: "/Home",
    component: Home, // Home component
  },
  {
    label: "Learning",
    submenu: [
      {
        label: "Custom Callback (Network Check)",
        path: "/learning/network-check",
        component: NetworkStatusCheck, // Replace with the actual component for Network Check
      },
      {
        label: "Create a Todos",
        path: "/learning/todos",
        component: Todos,
      },
      {
        label: "Additional Resources",
        // This item has no path or component, just a child
        submenu: [
          {
            label: "Documentation",
            // Further nested items can go here
          },
          {
            label: "Tutorials",
          },
        ],
      },
    ],
  },
];

// You can still define routes separately if needed, but this structure keeps it organized.
