import EditLayouts from '@/components/layouts/EditLayouts.vue';
import ErrorHandler from '@/module/ErrorHandler';
import { PATH_LIST, notNullValue } from '@/helpers';
import { MUTATION_TYPES } from '@/store';
import { COMMON_MESSAGE } from '@/conf/Message';
import Config from '@/conf/Config';

/*
 * 編集・登録画面の共通処理
 */
export default {
  beforeRouteLeave(to, from, next) {
    //  + フォームを1回も編集していない場合（= not dirty）
    //  + 完了画面への遷移
    //  + エラーの場合
    if ( !this.dirty
      || to.path === this.completePath
      || Config.ERROR_PATH.some(path => path.indexOf(to.path) !== -1)) {
      next();
    } else {
      this.$confirm(COMMON_MESSAGE.CLEAR_CONFIRM, '', {
        confirmButtonText: 'はい',
        cancelButtonText: 'いいえ',
        type: 'warning',
      }).then(() => {
        next();
      }).catch(() => {
        // nop
      });
    }
  },

  components: {
    EditLayouts,
  },

  data: () => ({
    form: {
      version: null
    },
  }),

  created() {
    this.$logger.info(`${this.currentName} start ...`);
    document.cookie = Config.FUNCTION_ID + this.screenId;
    this.$store.commit(MUTATION_TYPES.SET_PROCESSING, false);
    this.$store.commit(MUTATION_TYPES.SET_ERROR_MESSAGES, []);
  },

  async mounted() {
    if (this.$is.empty(this.currentQuery)) {
      this.$logger.info(`Register Start namespace=(${this.namespace})`);
    } else {
      const { id } = this.currentQuery;
      this.$logger.info(`Update Start namespace=(${this.namespace}) target = ${id}`);
      const response = await this.callFindById(id).catch(ErrorHandler.apiHandleErr);
      this.form = { ...this.$_.head(response.data) };
      this.formOrigin = { ...this.form };
    }
  },

  methods: {
    // callFindById: id => { /* callApi */ }, // <--- 個別に定義
    // callUpdate: id => { /* callApi */ }, // <--- 個別に定義
    // callCreate: id => { /* callApi */ }, // <--- 個別に定義
    update() {
      if (this.processing) { return; }
      this.$refs.edit.validate()
        .then(() => {
          this.$logger.info(`Update Action at ${this.currentName} ${JSON.stringify(this.notNullValue)}`);
          this.$store.commit(MUTATION_TYPES.SET_PROCESSING, true);
          const call = this.form.version ? this.callUpdate : this.callCreate;
          call(this.notNullValue)
            .then(() => {
              this.$store.commit(MUTATION_TYPES.SET_PROCESSING, false);
              this.$router.push({ path: this.completePath, query: { to: this.listPath } });
            })
            .catch(ErrorHandler.apiHandleErr)
            .finally(() => this.$store.commit(MUTATION_TYPES.SET_PROCESSING, false));
        });
    },
    back() {
      window.history.back();
    }
  },

  computed: {
    screenId: () => null, // <--- 個別に定義
    namespace: () => null, // <--- 個別に定義
    type() {
      return this.currentQuery.id ? 'update' : 'create';
    },
    listPath() { return `/${this.namespace}${PATH_LIST.LIST}`; },
    completePath() { return `/${this.namespace}${PATH_LIST.EDIT_COMPLETE}`; },
    notNullValue() {
      return notNullValue(this.form)
    },
  },

  watch: {
    'form': {
      handler () {
        if(this.$is.not.equal(JSON.stringify(this.formOrigin), JSON.stringify(this.form))) {
          this.dirty = true; // 一度でも変更された場合、dirtyとする
        }
      },
      deep: true
    }
  }
};
