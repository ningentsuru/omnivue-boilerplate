export const ROUTES = {
  LANDING_VIEW: { name: 'landing', path: '/' },
  LOGIN_VIEW: { name: 'login', path: '/login' },
  SIGNUP_VIEW: { name: 'signup', path: '/signup' },
  ABOUT_VIEW: { name: 'about', path: '/about' },
  DASHBOARD_VIEW: { name: 'dashboard', path: '/dashboard' },
  READ_ME_VIEW: { name: 'readMe', path: '/read-me' },
  MOBILE_FEATURES_VIEW: { name: 'mobileFeatures', path: '/mobile-features' },
  // plop:inject-routes-do-not-removed
  NOT_FOUND_VIEW: { name: 'notFound', path: '/:pathMatch(.*)*' },
} as const

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES]['name']
export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]['path']
