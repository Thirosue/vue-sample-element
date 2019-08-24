<template>
  <simple-layouts>
    <template v-slot:title>予期せぬエラー</template>
    <template v-slot:content>
      <el-alert type="error">
        <template slot="title">予期せぬエラーが発生しました。{{targetSorce}}よりもう一度操作してください。</template>
      </el-alert>
      <el-button v-if="!isLogin" type="text" @click.stop.prevent="go('/login')">ログインページ</el-button>
    </template>
  </simple-layouts>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
