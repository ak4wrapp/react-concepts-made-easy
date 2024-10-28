import Home from "../components/home";
import NetworkStatusCheck from "../components/network-status-check/network-status-check";
import Todos from "../components/excercise/todos/todos";
import { NavItem } from "./types";
import SimpleCounter from "../components/excercise/simple-counter/simple-counter";
import RandomQuoteGenerator from "../components/excercise/random-quote-generator/random-quote-generator";

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
        label: "Coding Excercises",
        submenu: [
          {
            label: "Create a Todos",
            path: "/learning/excercise/todos",
            component: Todos,
          },
          {
            label: "A Simple Counter",
            path: "/learning/excercise/simple-counter",
            component: SimpleCounter,
          },
          {
            label: "Random Quote Generator",
            path: "/learning/excercise/random-quote-generator",
            component: RandomQuoteGenerator,
          },
        ],
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
