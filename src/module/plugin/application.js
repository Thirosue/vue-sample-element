/* eslint-disable */

import is from 'is_js';
import _ from 'lodash';
import * as moment from 'moment';
import 'moment/locale/ja';
import logger from "@/module/Logger";
import Application from '@/views/base/Application';

export default {
  install: (Vue) => {
    Vue.mixin({
      mixins: [Application],
    });

    moment.locale('ja');
    Vue.prototype.$moment = moment;
    Vue.prototype.$is = is;
    Vue.prototype.$_ = _;
    Vue.prototype.$logger = logger;
  },
};
