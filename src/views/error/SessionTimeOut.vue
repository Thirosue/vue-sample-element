<template>
  <simple-layouts>
    <template v-slot:title>セッションタイムアウト</template>
    <template v-slot:content>
      <el-alert type="info">
        <template slot="title">セッションがタイムアウトしました。もう一度ログインしてください。</template>
      </el-alert>
      <el-button type="text" @click.stop.prevent="go('/login')">ログインページ</el-button>
    </template>
  </simple-layouts>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
