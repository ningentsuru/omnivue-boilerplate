export const ROUTES = {
  // ... existing constants
  // plop:insert-constant
  NOT_FOUND_VIEW: { name: 'notFound', path: '/:pathMatch(.*)*' },
  LANDING_VIEW: { name: 'landing', path: '/' },
  LOGIN_VIEW: { name: 'login', path: '/login' },
  SIGNUP_VIEW: { name: 'signup', path: '/signup' },
  ABOUT_VIEW: { name: 'about', path: '/about' },
  DASHBOARD_VIEW: { name: 'dashboard', path: '/dashboard' },
  READ_ME_VIEW: { name: 'readmeview', path: '/read-me' },
} as const

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES]['name']
export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]['path']
