<template>
  <el-date-picker v-model="day" format="yyyy/MM/dd" value-format="yyyy-MM-dd"></el-date-picker>
</template>
<script>
export default {
  props: {
    value: {}
  },
  computed: {
    day: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
