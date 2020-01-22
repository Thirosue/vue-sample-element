/**
 * 定数定義
 */
export default {
  MY_APP_PREFIX: 'sample-vue-app',

  DEFAULT_ROWS: '10',
  LOG_RETRY_MAX: 5, // アクセスログ保存のリトライ上限

  REDIRECT_URL: "redirectUrl",

  LOGIN_PATH: '/login',
  LOGOUT_PATH: '/logout',
  EDIT_PASSWORD: '/passwordEdit',
  INQUIRY: '/inquiry',
  SYSERR_PATH: '/systemError',
  SESSION_TIMEOUT_PATH: '/sessionTimeOut',
  BAD_REQUEST_PATH: '/badRequest',

  COOKIE_ID: 'sid=',
  FUNCTION_ID: 'fid=',

  SEPARATOR: ', ',

  ADMIN: 'system_admin',
  OPERATOR: 'operator',

  ERROR_PATH: ['systemError', 'sessionTimeOut', 'badRequest'], // エラーのパスリスト
};
