import { NavItem } from "../../types/nav-item";
import CustomHooksDemo from "./custom-hooks/custom-hooks-demo";
import ErrorBoundaryDemo from "./error-boundary/error-boundary-demo";
import ErrorBoundaryUsingNpmDemo from "./error-boundary/error-boundary-use-npm";
import ErrorBoundary2Demo from "./error-boundary/error-boundary2-demo";
import HOCUsageDemo from "./hight-order-components/hoc-usage-demo";
import Hooks from "./hooks/hooks";
import useMemoDemo from "./hooks/use-memo";
import MobXDemoComponent from "./mob-x/mobx-demo";
import SuspenseDemo from "./suspense/suspense";
import UseCallbackDemo from "./use-callback/use-callback-demo";
import UseCallBackDetailedComponent from "./use-callback/use-callback-self";
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
        path: "/learning/hooks",
        submenu: [
          {
            label: "All Hooks",
            path: "/learning/all-hooks",
            component: Hooks,
          },
          {
            label: "Use Memo Demo",
            path: "/learning/use-memo/demo", // Child route
            component: useMemoDemo,
          },
        ],
      },
      {
        label: "Use Callback",
        path: "/learning/use-callback", // Parent route
        submenu: [
          {
            label: "Use Callback Demo",
            path: "/learning/use-callback/demo", // Child route
            component: UseCallbackDemo,
          },
          {
            label: "Use Callback + Memo Detailed",
            path: "/learning/use-callback/detailed", // Child route
            component: UseCallBackDetailedComponent,
          },
        ],
      },
      {
        label: "Use Context",
        path: "/learning/use-context",
        component: UseContextDemo,
      },
      {
        label: "Error Boundar (Class Component)",
        path: "/learning/error-boundary",
        component: ErrorBoundaryDemo,
      },
      {
        label: "Error Boundary (Functional Component)",
        path: "/learning/error-boundary-2",
        component: ErrorBoundary2Demo,
      },
      {
        label: "Error Boundary (useErrorBoundary)",
        path: "/learning/error-boundary-using-npm",
        component: ErrorBoundaryUsingNpmDemo,
      },
      {
        label: "Suspense",
        path: "/learning/suspense",
        component: SuspenseDemo,
      },
      {
        label: "Mob X",
        path: "/learning/mobx",
        component: MobXDemoComponent,
      },
    ],
  },
];

export default learningMenuLinks;
