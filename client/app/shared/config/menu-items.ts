export interface RouteInfo {
  path: string;
  title: string;
  icon?: string;
  class?: string;
  exactMatch?: boolean;
}

export const ROUTES: RouteInfo[] = [
  {
    path: '/home',
    title: 'Home',
    icon: 'fa fa-lg fa-home',
    class: '',
    exactMatch: true
  },
  {
    path: '/settings',
    title: 'Settings',
    icon: 'fa fa-lg fa-cog',
    class: ''
  }
];
