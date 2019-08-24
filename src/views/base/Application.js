import { mapGetters } from 'vuex';
import SimpleLayouts from '@/components/layouts/SimpleLayouts.vue';
import Config from '@/conf/Config';
import { GETTER_TYPES } from '@/store';
import { SESSION_GETTER_TYPES } from '@/store/modules/session';
import { MASTER_GETTER_TYPES, MASTER_MUTATION_TYPES } from '@/store/modules/master';
import { masterApi } from '@/module/Api';
import MenuCategoryList from '@/conf/MenuCategoryList';
import MenuList from '@/conf/MenuList';
import ErrorHandler from '@/module/ErrorHandler';

export default {
  // beforeRouteEnter(to, from, next) {
  //  next((vm) => {});
  // },
  components: {
    SimpleLayouts,
  },

  beforeRouteLeave(to, from, next) {
    next();
  },

  created() {
    if (this.hasState && this.isLogin) {
      this.setMasterInfo();
    }
  },

  methods: {
    async setMasterInfo() {
      if (this.$options.name === 'Navbar') {
        // キャッシュ可のマスタをキャッシュする
        if (this.$is.empty(this.codeCategories)) {
          const response = await masterApi.getCodeCategory().catch(ErrorHandler.apiHandleErr);
          this.$store.commit(MASTER_MUTATION_TYPES.SET_CODE_CATEGORIES, response.data);
        }
        if (this.$is.empty(this.sex)) {
          const response = await masterApi.getSex().catch(ErrorHandler.apiHandleErr);
          this.$store.commit(MASTER_MUTATION_TYPES.SET_SEX, response);
        }
      }
    },
    go(url) {
      this.$router.push(url);
    },
    goHome() {
      this.$router.push("/");
    },
    getTargetList: (targetList, roles) => targetList.filter(row => row.roles.some(role => role === 'all' || roles.includes(role))),
  },

  computed: {
    ...mapGetters({
      session: SESSION_GETTER_TYPES.VALUES,
      isLogin: SESSION_GETTER_TYPES.IS_LOGIN,
      processing: GETTER_TYPES.GET_PROCESSING,
      isCollapse: GETTER_TYPES.GET_COLLAPSE,
      page: GETTER_TYPES.GET_PAGE,
      codeCategories: MASTER_GETTER_TYPES.CODE_CATEGORIES,
      sex: MASTER_GETTER_TYPES.SEX
    }),
    appPrefix() {
      return Config.MY_APP_PREFIX;
    },
    hasState() { return this.$store !== undefined; }, // pluginはステートを持たない
    // roles() { return this.session && this.session.roles ? this.session.roles : []; },
    roles() { return ['system_admin']; },
    menuCategories() {
      const categories = this.getTargetList(MenuCategoryList, this.roles);
      return this.$_.chain(categories)
        .sortBy('order')
        .value();
    },
    menus() {
      const menuList = this.getTargetList(MenuList, this.roles);
      return this.$_.chain(menuList)
        .sortBy('order')
        .value();
    },
    hasAdmin() { return this.session.roles.some(role => role === Config.ADMIN); },
    isProduction() {
      return this.$store.state.mode === 'production';
    },
    targetSorce() {
      return this.isLogin ? "メニュー" : "ログインページ";
    },
    currentPath() {
      return this.$router.history.current.path;
    },
    currentQuery() {
      return this.$router.history.current.query;
    },
  },
};
