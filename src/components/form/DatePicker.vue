<template>
  <el-date-picker @change="change" v-model="day" format="yyyy/MM/dd" value-format="yyyy-MM-dd"></el-date-picker>
</template>
<script>
export default {
  props: {
    value: {}
  },
  data() {
    return {
      day: this.value
    };
  },
  methods: {
    change(newValue) {
      this.$emit("input", newValue);
    }
  },
  watch: {
    value(newValue) {
      this.day = newValue;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
