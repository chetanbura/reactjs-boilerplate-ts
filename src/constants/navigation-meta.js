const NAV_META = [
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

export const getNavMeta = (isLoggedIn) =>
  NAV_META.filter((nav) => (nav.isPrivate && isLoggedIn) || !nav.isPrivate);
