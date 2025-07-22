export const WEB_VIEW_URL = __DEV__
  ? 'http://localhost:5173'
  : 'https://status-front-rho.vercel.app';

export const MESSAGE_TYPES = {
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_ERROR: 'AUTH_ERROR',
  OPEN_EXTERNAL_BROWSER: 'OPEN_EXTERNAL_BROWSER',
} as const;
