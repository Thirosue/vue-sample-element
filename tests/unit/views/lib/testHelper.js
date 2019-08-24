import { createLocalVue } from '@vue/test-utils';

// add Font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

// add plugin for global
import MyApplicationPlugin from '@/module/plugin/application';

// add filter for global
import filter from '@/module/filter';

// add directive for global
import directive from '@/module/directive';

// add compornent for global
import ErrorBoundary from '@/components/ErrorBoundary.vue';
import ErrorArea from '@/components/ErrorArea.vue';
import Header from '@/components/Header.vue';
import NavBar from '@/components/Navbar.vue';

import '@/assets/theme/index.css';

const _localVue = () => {
  const localVue = createLocalVue();

  localVue.use(ElementUI);
  localVue.use(Vuex);
  localVue.use(VueRouter);

  localVue.use(MyApplicationPlugin);

  localVue.filter('YYYYMMDD', filter.YYYYMMDD);
  localVue.filter('YYMMDD_YYYYMMDD', filter.YYMMDD_YYYYMMDD);
  localVue.filter('YYYYMMDDHHmm', filter.YYYYMMDDHHmm);
  localVue.filter('YYYYMMDDHHmmss', filter.YYYYMMDDHHmmss);
  localVue.filter('joinComma', filter.joinComma);
  localVue.filter('joinSpace', filter.joinSpace);
  localVue.filter('AddComma', filter.AddComma);
  localVue.filter('Flag', filter.Flag);

  localVue.directive('focus', directive.focus);

  library.add(fas, far, fab);
  localVue.component('font-awesome-icon', FontAwesomeIcon);
  localVue.component('error-boundary', ErrorBoundary);
  localVue.component('error-area', ErrorArea);
  localVue.component('app-navbar', NavBar);
  localVue.component('app-header', Header);

  //for datadog
  global.DD_LOGS = {
    logger: {
      info: (message) => console.log(message)
    }
  };

  return localVue;
}

export { _localVue as default }; 