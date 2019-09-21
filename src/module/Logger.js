/* eslint-disable */
import moment from 'moment';
import Config from '@/conf/Config';
import store from '@/store';
import Cookies from 'js-cookie';
import { SESSION_GETTER_TYPES } from '@/store/modules/session';

export default class Logger {
  static isProduction() {
    return store.state.mode === 'production';
  }

  static log(message, info, level) {
    const cookie = Cookies.get();
    const session = store.getters[SESSION_GETTER_TYPES.VALUES];
    const logInfo = `${moment().format()} ${message} uid@${cookie.uid} user@${session.id}`;
    if (window.location.host !== Config.LOCAL_HOST && this.isProduction()) {
      DD_LOGS.logger.info(logInfo, info, level);
      if (info && info.err) {
        DD_LOGS.logger.info(info.err, info, level);
      }
    } else {
      console.log(logInfo);
      if (info && info.err) {
        console.error(info.err);
      }
    }
  }

  static info(message, info) {
    this.log(message, info, 'info');
  }

  static error(message, info) {
    this.log(message, info, 'error');
  }
}
