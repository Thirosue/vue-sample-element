import ListLayouts from '@/components/layouts/ListLayouts.vue';
import ErrorHandler from '@/module/ErrorHandler';
import Config from '@/conf/Config';
import { COMMON_MESSAGE } from '@/conf/Message';
import { PATH_LIST, notNullValue } from '@/helpers';
import { MUTATION_TYPES } from "@/store";

/*
 * 一覧画面の共通処理
 */
export default {
  components: {
    ListLayouts,
  },

  data: () => ({
    form: {
      rows: 10
    },
    results: [],
    count: null,
  }),

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.updateScreenId.includes(from.path)) {
        vm.$message({
          message: COMMON_MESSAGE.UPDATED,
          type: "success"
        });
      }
    });
  },

  beforeRouteUpdate(to, from, next) {
    this.results = [];
    if (this.$is.not.empty(to.query)) {
      this.findAll();
    }
    next();
  },


  created() {
    this.$logger.info('BaseList start ...');
    document.cookie = Config.FUNCTION_ID + this.screenId;
    this.$store.commit(MUTATION_TYPES.SET_PROCESSING, false);
    this.$store.commit(MUTATION_TYPES.SET_ERROR_MESSAGES, []);
  },

  mounted() {
    this.$store.commit(MUTATION_TYPES.SET_PAGE, this.currentQuery.page ? this.$_.parseInt(this.currentQuery.page) : 1);
    this.form = { ...this.currentQuery, 'rows': this.currentQuery.rows ? this.$_.parseInt(this.currentQuery.rows) : 10 };

    if (this.$is.not.empty(this.currentQuery)) {
      this.findAll();
    }
  },

  methods: {
    // callApi: where => { /* callApi */ }, // <--- 個別に定義
    search(page) {
      this.$store.commit(MUTATION_TYPES.SET_PAGE, page);
      this.$router.push({ path: this.currentPath, query: { ...this.where, page, 'rows': this.form.rows } });
    },
    async findAll() {
      this.$logger.info(`Search Action at ${this.path}`, { id: this.session.username, path: this.currentPath, query: this.where });
      this.$store.commit(MUTATION_TYPES.SET_PROCESSING, true);
      const response = await this.callApi(this.where).catch(ErrorHandler.apiHandleErr);
      this.$store.commit(MUTATION_TYPES.SET_PROCESSING, false);
      this.count = response.count;
      this.results = response.data;
    },
    download() {
    },
    goCreate() {
      this.$router.push(`/${this.namespace}${PATH_LIST.EDIT}`);
    },
    goEdit(id) {
      this.$router.push(`/${this.namespace}${PATH_LIST.EDIT}?id=${id}`);
    },
  },

  computed: {
    screenId: () => null, // <--- 個別に定義
    namespace: () => null, // <--- 個別に定義
    where() {
      const conditions = { ...this.form, 'page': this.page, 'rows': this.form.rows };
      return notNullValue(conditions)
    },
    updateScreenId() { return [PATH_LIST.EDIT_COMPLETE, PATH_LIST.REGISTER_COMPLETE].map(str => `/${this.namespace}${str}`); },
  },
};
