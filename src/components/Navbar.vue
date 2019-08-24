<template>
  <el-menu
    v-if="isLogin"
    id="menu"
    default-active="1"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
  >
    <el-submenu :key="i" :index="getMenuIndex(i)" v-for="(category, i) in menuCategories">
      <template slot="title">
        <font-awesome-icon :icon="category.icon" size="lg" />
        <span slot="title">{{category.name}}</span>
      </template>
      <!-- eslint-disable vue/no-use-v-if-with-v-for -->
      <el-menu-item
        v-if="category.category === menu.category"
        v-for="(menu, j) in menus"
        :index="getSubMenuIndex(i, j)"
        :key="j"
      >
        <span slot="title">
          <el-button type="text" @click.stop.prevent="go(menu.url)">{{menu.name}}</el-button>
        </span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "Navbar",

  methods: {
    getMenuIndex: i => String(i + 1),
    getSubMenuIndex: (i, j) => `${String(i + 1)}-${String(j + 1)}`
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#menu .el-submenu__title svg {
  margin-right: 8px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 170px;
  min-height: 400px;
}
</style>
