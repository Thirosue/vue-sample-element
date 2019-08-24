<template>
  <el-container id="header">
    <el-container>
      <span @click="goHome">
        <el-aside
          style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
          width="250px"
        >Vue Element Sample</el-aside>
      </span>
      <el-container v-if="isLogin">
        <el-aside width="80px">
          <el-button @click.prevent="toggle">
            <i class="el-icon-plus" v-if="isCollapse"></i>
            <i class="el-icon-minus" v-else></i>
          </el-button>
        </el-aside>
        <el-container>
          <el-header style="text-align: right;">
            <span style="font-size:0.9em; margin-right: 10px;">{{session.username}}</span>
            <el-button type="text" @click.stop.prevent="logout">sing out</el-button>
          </el-header>
        </el-container>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Config from "@/conf/Config";
import { MUTATION_TYPES } from "@/store";

export default {
  name: "Header",
  methods: {
    toggle() {
      this.$store.commit(MUTATION_TYPES.SET_COLLAPSE, !this.isCollapse);
    },
    logout() {
      this.$router.push(Config.LOGOUT_PATH);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#header {
  margin-bottom: 5px;
}
.el-aside {
  text-align: center;
  line-height: 60px;
}
</style>
