import { NavItem } from "../../types/nav-item";
import RandomQuoteGenerator from "./random-quote-generator/random-quote-generator";
import RandomStory from "./random-story-generator/random-story-generator";
import SimpleCounter from "./simple-counter/simple-counter";
import Todos from "./todos/todos";
import TodoList from "./todo-new/todo-list";
import WebSocketComponent from "./web-sockets/WebSocketComponent";

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
        label: "Create a Todos (New)",
        path: "/learning/excercise/todos1",
        component: TodoList,
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
      {
        label: "Random Story Generator",
        path: "/learning/excercise/random-story-generator",
        component: RandomStory,
      },
      {
        label: "Web Sockets",
        path: "/learning/excercise/web-sockets",
        component: WebSocketComponent,
      },
    ],
  },
];
