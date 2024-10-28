import { NavItem } from "../../types/nav-item";
import CustomHooksDemo from "./custom-hooks/custom-hooks-demo";
import HOCUsageDemo from "./hight-order-components/hoc-usage-demo";
import UseCallbackDemo from "./use-callback/use-callback-demo";

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
        label: "Use Callback",
        path: "/learning/use-callback-demo",
        component: UseCallbackDemo,
      },
    ],
  },
];

export default learningMenuLinks;
