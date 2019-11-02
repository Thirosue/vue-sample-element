<template>
  <div>
    <list-layouts
      :form.sync="form"
      :search="search"
      :results="results"
      :count="count"
      :searched="searched"
    >
      <template v-slot:title>サンプル</template>

      <template v-slot:form>
        <el-form-item id="firstName" label="単一セレクトボックス" prop="val">
          <single-options :options="options" v-model="form.val" />
        </el-form-item>
        <el-form-item id="firstName" label="ラジオ" prop="val2">
          <radio-options :options="options" v-model="form.val2" />
        </el-form-item>
        <el-form-item id="firstName" label="複数セレクトボックス" prop="list1">
          <multiple-options :options="options" v-model="form.list1" />
        </el-form-item>
        <el-form-item id="firstName" label="チェックボックス" prop="list2">
          <multiple-checkbox :options="options" v-model="form.list2" />
        </el-form-item>
        <el-form-item id="firstName" label="日付" prop="date">
          <date-picker v-model="form.date" />
        </el-form-item>
      </template>
    </list-layouts>
    {{this.form}}
  </div>
</template>

<script>
import {
  SingleOptions,
  MultipleOptions,
  MultipleCheckbox,
  RadioOptions,
  DatePicker
} from "@/components/form";
import { BaseList } from "@/views/base";

export default {
  components: {
    SingleOptions,
    MultipleOptions,
    MultipleCheckbox,
    RadioOptions,
    DatePicker
  },

  name: "StaffList",
  mixins: [BaseList],

  data() {
    return {
      options: [
        { key: "k1", value: "v1" },
        { key: "k2", value: "v2" },
        { key: "k3", value: "v3" },
        { key: "k4", value: "v4" }
      ],
      form: {
        list1: [],
        list2: [],
        val: "",
        val2: "",
        date: new Date()
      }
    };
  },

  methods: {
    callApi: where => {
      this.$logger.info(where);
      return new Promise(resolve => {
        resolve();
      });
    }
  },

  computed: {
    screenId: () => "SAMPLE", // <--- 個別に定義
    namespace: () => "sample" // <--- 個別に定義
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
