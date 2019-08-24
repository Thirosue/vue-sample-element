<template>
  <div>
    <simple-layouts v-if="error">
      <template v-slot:title>予期せぬエラー</template>
      <template v-slot:content>
        <el-alert type="error">
          <template slot="title">予期せぬエラーが発生しました。{{targetSorce}}よりもう一度操作してください。</template>
        </el-alert>
        <article v-if="!isProduction">
          <div>
            <p>エラーメッセージ : {{error.message}}</p>
            <p>エラー情報 : {{info}}</p>
            <p>エラー詳細 :</p>
            <p>{{error.stack}}</p>
          </div>
        </article>
        <el-button v-if="!isLogin" type="text" @click.stop.prevent="go('/login')">ログインページ</el-button>
      </template>
    </simple-layouts>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script>
// eslint-disable-next-line
import ErrorTracking from "@/module/ErrorTracking";

export default {
  data() {
    return {
      error: null,
      info: null
    };
  },
  errorCaptured(err, vm, info) {
    this.$logger.error(`Error Occurred at ${window.location.href}`, {
      err,
      info
    });
    if (this.isProduction) {
      // ErrorTracking.captureException(err);
      // ErrorTracking.showReportDialog();
    }
    this.error = err;
    this.info = info;
  },
  methods: {
    goHome() {
      this.error = null;
      this.info = null;
      this.$router.push("/");
    },
    goLogin() {
      this.error = null;
      this.info = null;
      this.$router.push("/login");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main article {
  text-align: left;
}
</style>
