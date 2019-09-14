/*
 * メニュー一覧
 *
 * 許可リスト方式
 * 全てのロールに許可する画面は "all" を指定
*/
import Config from '@/conf/Config';

export default [
  {
    category: 'STAFF', order: 1, id: 'STAFF_LIST', name: 'スタッフ一覧', url: '/staffList', roles: [Config.ADMIN],
  },
  {
    category: 'STAFF', order: 2, id: 'STAFF_REGISTER', name: 'スタッフ登録', url: '/staffEdit', roles: [Config.ADMIN],
  },
  {
    category: 'HOLIDAY', order: 1, id: 'HOLIDAY_LIST', name: '祝日一覧', url: '/holidayList', roles: [Config.ADMIN],
  },
  {
    category: 'HOLIDAY', order: 2, id: 'HOLIDAY_REGISTER', name: '祝日登録', url: '/holidayEdit', roles: [Config.ADMIN],
  },
];
