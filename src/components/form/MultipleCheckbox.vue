<template>
  <el-checkbox-group @change="change" v-model="checkList">
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
  data() {
    return {
      checkList: this.value
    };
  },
  methods: {
    change(newValue) {
      this.$emit("input", newValue);
    }
  },
  watch: {
    value(newValue) {
      if (newValue instanceof Array) {
        this.checkList = newValue;
      } else {
        this.checkList = [newValue];
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
