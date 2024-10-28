import learningMenuLinks from "../components/learning/learning-menu-links";
import { genericMenuLinks } from "../components/generic/generic-menu-links";
import { excerciseMenuLinks } from "../components/excercise/excercise-menu-links";
import { NavItem } from "../types/nav-item";

export const menuLinks: NavItem[] = [
  ...genericMenuLinks,
  ...learningMenuLinks,
  ...excerciseMenuLinks,
];
