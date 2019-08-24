/* eslint-disable */
import Vue from 'vue';

// add Font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// for event logging
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

import ElementUI from 'element-ui';

import router from '@/router';
import store from '@/store';
import './registerServiceWorker';

// add plugin for global
import MyApplicationPlugin from '@/module/plugin/application';

// add filter for global
import filter from '@/module/filter';

// add directive for global
import directive from '@/module/directive';

// add compornent for global
import ErrorBoundary from '@/components/ErrorBoundary.vue';
import ErrorArea from '@/components/ErrorArea.vue';
import NavBar from '@/components/Navbar.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

import App from './App.vue';
import logger from '@/module/Logger';

import '@/assets/theme/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.use(MyApplicationPlugin);

Vue.filter('YYYYMMDD', filter.YYYYMMDD);
Vue.filter('YYMMDD_YYYYMMDD', filter.YYMMDD_YYYYMMDD);
Vue.filter('YYYYMMDDHHmm', filter.YYYYMMDDHHmm);
Vue.filter('YYYYMMDDHHmmss', filter.YYYYMMDDHHmmss);
Vue.filter('joinComma', filter.joinComma);
Vue.filter('joinSpace', filter.joinSpace);
Vue.filter('AddComma', filter.AddComma);
Vue.filter('Flag', filter.Flag);

Vue.directive('focus', directive.focus);

library.add(fas, far, fab);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('error-boundary', ErrorBoundary);
Vue.component('error-area', ErrorArea);
Vue.component('app-navbar', NavBar);
Vue.component('app-header', Header);
Vue.component('app-footer', Footer);

Vue.config.errorHandler = (err, vm, info) => {
  logger.error('errorHandlererr:', err);
  logger.error('errorHandlervm:', vm);
  logger.error('errorHandlerinfo:', info);
};

// Sentry.init({
//   dsn: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
//   integrations: [
//     new Integrations.Vue({
//       Vue,
//       attachProps: true,
//     }),
//   ],
// });

// // Set your DataDog client token
// // eslint-disable-next-line
// DD_LOGS.init({
//   clientToken: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
//   forwardErrorsToLogs: true,
// });

// // eslint-disable-next-line
// DD_LOGS.addLoggerGlobalContext('AppType', 'management');

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
