<template>
  <el-select multiple @change="change" v-model="selected">
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
  data() {
    return {
      selected: this.value
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
        this.selected = newValue;
      } else {
        this.selected = [newValue];
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
