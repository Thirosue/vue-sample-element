import ErrorHandler from '@/module/ErrorHandler';
import Config from '@/conf/Config';

export default {
  data: () => ({
    data: {},
  }),
  created() {
    document.cookie = Config.FUNCTION_ID + this.screenId;
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
