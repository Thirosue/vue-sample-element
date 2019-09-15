<template>
  <el-radio-group @change="change" v-model="selected" :disabled="disabled">
    <el-radio v-for="({key, value}, index) in options" :label="key" :key="index">{{value}}</el-radio>
  </el-radio-group>
</template>

<script>
import _ from "lodash";
import { isEmpty } from "@/helpers/validators";

export default {
  props: {
    value: {},
    required: {
      type: Boolean,
      required: false,
      default: true
    },
    options: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      selected:
        isEmpty(this.value) && this.required
          ? _.head(this.options).key
          : this.value
    };
  },
  methods: {
    change(newValue) {
      this.$emit("input", newValue);
    }
  },
  watch: {
    value(newValue) {
      this.selected = newValue;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
