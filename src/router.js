import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import Config from '@/conf/Config';
import Statistics from '@/module/Statistics';
import { SESSION_GETTER_TYPES } from '@/store/modules/session';
import { buildPath } from '@/helpers';
import { isEmpty } from '@/helpers/validators';
import ErrorTracking from '@/module/ErrorTracking';
import logger from '@/module/Logger';
import { authApi } from "@/module/Api";

Vue.use(Router);

/* namespace */
const NAMESPACE_STAFF = 'staff';
const NAMESPACE_HOLIDAY = 'holiday';
const STAFF = buildPath(NAMESPACE_STAFF);
const HOLIDAY = buildPath(NAMESPACE_HOLIDAY);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: Config.SESSION_TIMEOUT_PATH,
      name: 'SessionTimeOut',
      component: () => import(/* webpackChunkName: "about" */ '@/views/error/SessionTimeOut.vue'),
      meta: {
        requiresAuth: false,
        title: 'セッションタイムアウト',
      },
    },
    {
      path: Config.BAD_REQUEST_PATH,
      name: 'BadRequest',
      component: () => import(/* webpackChunkName: "about" */ '@/views/error/BadRequest.vue'),
      meta: {
        requiresAuth: false,
        title: '不正な画面遷移',
      },
    },
    {
      path: Config.SYSERR_PATH,
      name: 'SystemError',
      component: () => import(/* webpackChunkName: "about" */ '@/views/error/SystemError.vue'),
      meta: {
        requiresAuth: false,
        title: '予期せぬエラー',
      },
    },
    {
      path: Config.LOGIN_PATH,
      name: 'Login',
      component: () => import(/* webpackChunkName: "about" */ '@/views/login/Login.vue'),
      meta: {
        requiresAuth: false,
        title: 'ログイン',
      },
    },
    {
      path: Config.LOGOUT_PATH,
      name: 'Logout',
      component: () => import(/* webpackChunkName: "about" */ '@/views/login/Logout.vue'),
      meta: {
        requiresAuth: false,
        title: 'ログアウト',
      },
    },
    {
      path: '/',
      name: 'Index',
      component: () => import(/* webpackChunkName: "about" */ '@/views/index/Index.vue'),
      meta: {
        requiresAuth: true,
        title: 'ポータルトップ',
        allowRoles: [Config.ADMIN, Config.OPERATOR],
      },
    },
    {
      path: STAFF.LIST,
      name: 'StaffList',
      component: () => import(/* webpackChunkName: "about" */ '@/views/staff/StaffList.vue'),
      meta: {
        requiresAuth: true,
        title: '担当者一覧',
        allowRoles: [Config.ADMIN],
      },
    },
    {
      path: STAFF.EDIT,
      name: 'StaffEdit',
      component: () => import(/* webpackChunkName: "about" */ '@/views/staff/StaffEdit.vue'),
      meta: {
        requiresAuth: true,
        title: '担当者編集',
        allowRoles: [Config.ADMIN],
      },
    },
    {
      path: STAFF.EDIT_COMPLETE,
      name: 'StaffEditComplete',
      component: () => import(/* webpackChunkName: "about" */ '@/views/common/Complete.vue'),
      meta: {
        requiresAuth: true,
        title: '担当者編集完了',
        allowRoles: [Config.ADMIN],
      },
    },
    {
      path: HOLIDAY.LIST,
      name: 'HoliDayList',
      component: () => import(/* webpackChunkName: "about" */ '@/views/holiday/HolidayList.vue'),
      meta: {
        requiresAuth: true,
        title: '祝日一覧',
        allowRoles: [Config.ADMIN],
      },
    },
    {
      path: HOLIDAY.EDIT,
      name: 'HoliDayEdit',
      component: () => import(/* webpackChunkName: "about" */ '@/views/holiday/HolidayEdit.vue'),
      meta: {
        requiresAuth: true,
        title: '祝日編集',
        allowRoles: [Config.ADMIN],
      },
    },
    {
      path: HOLIDAY.EDIT_COMPLETE,
      name: 'HoliDayEditComplete',
      component: () => import(/* webpackChunkName: "about" */ '@/views/common/Complete.vue'),
      meta: {
        requiresAuth: true,
        title: '祝日編集完了',
        allowRoles: [Config.ADMIN],
      },
    },
    {
      path: '/inquery',
      name: 'Inquery',
      component: () => import(/* webpackChunkName: "about" */ '@/views/system/Inquery.vue'),
      meta: {
        requiresAuth: true,
        title: 'お問い合わせ',
        allowRoles: [Config.ADMIN],
      },
    },
    {
      path: '/sample',
      name: 'sample',
      component: () => import(/* webpackChunkName: "about" */ '@/views/system/Sample.vue'),
      meta: {
        requiresAuth: true,
        title: 'サンプル',
        allowRoles: [Config.ADMIN],
      },
    }
  ],
});

router.beforeEach(async (to, from, next) => {
  logger.info('__beforeEach__');
  document.title = `Element Sample ｜ ${to.meta.title}`;
  if (isEmpty(to.meta.title)) { // ルーティングなし
    logger.info('nothing to route table');
    next(Config.BAD_REQUEST_PATH);
    return;
  }
  const session = store.getters[SESSION_GETTER_TYPES.VALUES];
  if (to.meta.requiresAuth) {
    // 未ログイン時はログインページへリダイレクト
    if (isEmpty(session)) {
      logger.info('Redirect to Login Form');
      sessionStorage.setItem(Config.REDIRECT_URL, JSON.stringify({path: to.path, query: to.query})); // redirect settings
      next(Config.LOGIN_PATH);
      return;
    }

    // 権限エラーのハンドリング
    if (!to.meta.allowRoles.some(role => session.roles !== null && session.roles.includes(role))) {
      logger.info('UnAuthorize Action');
      next(Config.BAD_REQUEST_PATH);
      return;
    }

    // セッション確認
    await authApi.checkSession()
      .then(() => logger.info('session available!'))
      .catch((error) => {
        if (error.response.status === 401) {
          next(Config.SESSION_TIMEOUT_PATH);
        } else {
          next(error);
          next(Config.SYSERR_PATH);
        }
      });
  }
  if (from.path !== to.path) {
    logger.info(`Screen transition. from=(${from.path}) to=(${to.path})`, { id: session.username });
    const statistics = new Statistics();
    statistics.setAccessLog(to.path);
  }
  next();
});

// router.afterEach((to, from) => {
// });

router.onError((error) => {
  ErrorTracking.captureException(error);
  ErrorTracking.showReportDialog();
});

export default router;
