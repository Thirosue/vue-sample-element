/*
 * メニューカテゴリ一覧
 *
 * 許可リスト方式
 * 全てのロールに許可する画面は "all" を指定
*/
import Config from '@/conf/Config';

export default [
  {
    category: 'STAFF', icon: 'user-tie', order: 1, name: 'スタッフ管理', roles: [Config.ADMIN],
  },
  {
    category: 'USER', icon: 'user', order: 2, name: '会員管理', roles: [Config.ADMIN],
  },
  {
    category: 'HOLIDAY', icon: 'calendar-alt', order: 3, name: '祝日管理', roles: [Config.ADMIN],
  },
];
