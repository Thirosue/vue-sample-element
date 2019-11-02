<template>
  <el-select multiple v-model="selected">
    <span slot="empty">{{defaultValue}}</span>
    <el-option value v-if="!required" :label="defaultValue"></el-option>
    <el-option v-for="({key, value}, index) in options" :label="value" :key="index" :value="key"></el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    value: {},
    options: {
      type: Array,
      required: true
    },
    required: {
      type: Boolean,
      required: false,
      default: true
    },
    defaultValue: {
      type: String,
      required: false,
      default: "選択してください"
    }
  },
  computed: {
    selected: {
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
