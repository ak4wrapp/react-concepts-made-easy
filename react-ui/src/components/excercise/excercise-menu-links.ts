import { NavItem } from "../../types/nav-item";
import RandomQuoteGenerator from "./random-quote-generator/random-quote-generator";
import SimpleCounter from "./simple-counter/simple-counter";
import Todos from "./todos/todos";

export const excerciseMenuLinks: NavItem[] = [
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
];
