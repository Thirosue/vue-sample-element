<template>
  <div>
    <app-header></app-header>
    <el-container>
      <app-navbar></app-navbar>
      <el-main>Home</el-main>
    </el-container>
  </div>
</template>

<script>
import Config from "@/conf/Config";
import { isNotEmpty } from '@/helpers/validators';
import { LOGIN_MESSAGE } from "@/conf/Message";

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path === Config.LOGIN_PATH) {
        vm.$message({
          message: LOGIN_MESSAGE.LOGIN,
          type: "success"
        });
      }

      /* 直リンクした場合は、リダイレクトさせる */
      const redirect = vm.$_.attempt(JSON.parse.bind(null, sessionStorage.getItem(Config.REDIRECT_URL))); // eslint-disable-line
      sessionStorage.removeItem(Config.REDIRECT_URL); // clear redirect settings
      if(!vm.$_.isError(redirect) && vm.$is.object(redirect) && isNotEmpty(redirect)) { // eslint-disable-line
        next({path: redirect.path, query: redirect.query});
      }
    });
  },
  mounted() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
