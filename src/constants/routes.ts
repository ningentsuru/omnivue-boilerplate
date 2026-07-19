export const ROUTES = {
  HOME_VIEW: { name: 'home', path: '/' },
  OPTIMIZED_DATA_LIST_VIEW: { name: 'optimizedDataList', path: '/optimized-data-list' },
  // plop:inject-routes-do-not-removed
} as const

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES]['name']
export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]['path']
