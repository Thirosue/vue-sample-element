<template>
  <div id="root">
    <error-boundary id="app" v-cloak>
      <router-view />
    </error-boundary>
    <app-footer></app-footer>
  </div>
</template>

<style>
#root {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.el-header {
  font-size: 1.2em;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 70vh;
}

#main .el-header {
  font-size: 1.3em;
  color: #333;
  text-align: left;
  font-weight: bold;
  line-height: 60px;
}

#main .el-pagination {
  margin-top: 10px;
}

#main .button-area {
  display: inline-block;
  margin-top: 10px;
}
</style>
