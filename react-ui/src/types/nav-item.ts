export interface NavItem {
  label: string;
  path?: string; // Optional, as some items may not have a path
  component?: React.ComponentType; // Component associated with the route (optional)
  submenu?: NavItem[]; // Optional property for submenus
}
