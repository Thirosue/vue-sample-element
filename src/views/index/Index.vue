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
      const redirectUrl = sessionStorage.getItem(Config.REDIRECT_URL);
      sessionStorage.removeItem(Config.REDIRECT_URL); // clear redirect settings
      if(isNotEmpty(redirectUrl)) {
        next(redirectUrl);
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
