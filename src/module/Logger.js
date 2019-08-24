/* eslint-disable */
import store from '@/store';
import Cookies from 'js-cookie';

export default class Logger {
  static isProduction() {
    return store.state.mode === 'production';
  }

  static log(message, info, level) {
    const cookie = Cookies.get();
    if (DD_LOGS && this.isProduction()) {
      DD_LOGS.logger.info(`${message} uid@${cookie.uid}`, info, level);
    } else {
      console.log(message);
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
