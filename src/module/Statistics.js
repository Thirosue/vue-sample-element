import _ from 'lodash';
import moment from 'moment';
import { logApi } from '@/module/Api';
import Config from '@/conf/Config';
import logger from '@/module/Logger';

export default class Statistics {
  constructor() {
    window.setInterval(async () => {
      const processing = this.constructor.getAccessLog();
      const successes = await this.constructor.logging(processing);

      const retries = _.xor(processing, successes);
      for (let i = 0; i < retries.length; i += 1) {
        retries[i].retry += 1;
      }

      this.constructor.setAccessLog(retries.filter(r => r.retry < Config.LOG_RETRY_MAX));
    }, 3000);
  }

  static getAccessLog() {
    return JSON.parse(sessionStorage.getItem('accesslog')) || [];
  }

  static setAccessLog(accesslog) {
    return sessionStorage.setItem('accesslog', JSON.stringify(accesslog));
  }

  static logging(targets) {
    const results = [];
    targets.forEach(accesslog => results.push(this.callAPi(accesslog)));
    return Promise.all(results);
  }

  static callAPi(accesslog) {
    return logApi.access({ path: accesslog.path })
      .then(() => {
        logger.info(`push success! path=(${accesslog.path})`);
        return accesslog;
      })
      .catch(() => []);
  }

  setAccessLog(path) {
    const accesslog = this.constructor.getAccessLog();
    accesslog.push(({ timestamp: moment().format(), path, retry: 0 }));
    this.constructor.setAccessLog(accesslog);
  }
}
