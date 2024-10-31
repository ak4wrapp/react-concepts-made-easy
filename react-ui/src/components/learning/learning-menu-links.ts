import { NavItem } from "../../types/nav-item";
import CustomHooksDemo from "./custom-hooks/custom-hooks-demo";
import ErrorBoundaryDemo from "./error-boundary/error-boundary-demo";
import ErrorBoundary2Demo from "./error-boundary/error-boundary2-demo";
import HOCUsageDemo from "./hight-order-components/hoc-usage-demo";
import Hooks from "./hooks/hooks";
import UseCallbackDemo from "./use-callback/use-callback-demo";
import UseContextDemo from "./use-context/use-context-demo";

const learningMenuLinks: NavItem[] = [
  {
    label: "Learning",
    submenu: [
      {
        label: "Custom Hooks",
        path: "/learning/custom-hooks-demo",
        component: CustomHooksDemo,
      },
      {
        label: "HOC High Order Components",
        path: "/learning/hoc-demo",
        component: HOCUsageDemo,
      },
      {
        label: "Hooks",
        path: "/learning/excercise/hooks",
        component: Hooks,
      },
      {
        label: "Use Callback",
        path: "/learning/use-callback-demo",
        component: UseCallbackDemo,
      },
      {
        label: "Use Context",
        path: "/learning/excercise/use-context",
        component: UseContextDemo,
      },
      {
        label: "Error Boundar (Class Component)",
        path: "/learning/excercise/error-boundary",
        component: ErrorBoundaryDemo,
      },
      {
        label: "Error Boundary (Functional Component)",
        path: "/learning/excercise/error-boundary-2",
        component: ErrorBoundary2Demo,
      },
    ],
  },
];

export default learningMenuLinks;
