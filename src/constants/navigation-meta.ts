import { TNavMeta } from '../interfaces';

const NAV_META: TNavMeta[] = [
  {
    path: 'about',
    title: 'About',
    component: 'about',
  },
  {
    path: 'contact',
    title: 'Contact Us',
    component: 'contact',
  },
  {
    path: 'profile',
    title: 'User Profile',
    component: 'profile',
    subNav: [
      {
        path: 'update-email',
        title: 'Update Email',
        component: 'update-email',
      },
    ],
    isPrivate: true,
  },
];

export const LOGGED_IN = true;

export const getNavMeta = (isLoggedIn: boolean): TNavMeta[] =>
  NAV_META.filter((nav: TNavMeta) => (nav.isPrivate && isLoggedIn) || !nav.isPrivate);
