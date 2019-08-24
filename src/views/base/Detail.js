import ErrorHandler from '@/module/ErrorHandler';
import Config from '@/conf/Config';
import { MUTATION_TYPES } from "@/store";

export default {
  data: () => ({
    data: {},
  }),
  created() {
    this.$logger.info('BaseDetail start ...');
    document.cookie = Config.FUNCTION_ID + this.screenId;
    this.$store.commit(MUTATION_TYPES.SET_PROCESSING, false);
    this.$store.commit(MUTATION_TYPES.SET_ERROR_MESSAGES, []);
  },
  mounted() {
    this.findById(this.$route.params.id);
  },
  methods: {
    // callApi: id => { /* callApi */ }, // <--- 個別に定義
    async findById(id) {
      const response = await this.callApi(id).catch(ErrorHandler.apiHandleErr);
      this.data = this.$_.head(response.data);
    }
  },
  computed: {
    screenId: () => null, // <--- 個別に定義
    namespace: () => null, // <--- 個別に定義
  },
};
