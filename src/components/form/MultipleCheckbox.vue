<template>
  <el-checkbox-group v-model="checkList">
    <el-checkbox v-for="({key, value}, index) in options" :label="key" :key="index">{{value}}</el-checkbox>
  </el-checkbox-group>
</template>

<script>
export default {
  props: {
    value: {},
    options: {
      type: Array,
      required: true
    }
  },
  computed: {
    checkList: {
      get() {
        if (this.value instanceof Array) {
          return this.value;
        }
        return [this.value];
      },
      set(values) {
        this.$emit("input", values.filter(val => val));
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
