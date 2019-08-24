<template>
  <div>
    <app-header></app-header>

    <el-container>
      <app-navbar></app-navbar>

      <el-main id="main">
        <el-header>
          <!-- setting title -->
          <slot name="title"></slot>
        </el-header>

        <!-- setting content -->
        <slot name="content"></slot>
      </el-main>
    </el-container>
  </div>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
