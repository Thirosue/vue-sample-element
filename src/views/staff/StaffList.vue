<template>
  <div>
    <list-layouts
      :form.sync="form"
      :search="search"
      :goCreate="goCreate"
      :results="results"
      :count="count"
      :searched="searched"
    >
      <template v-slot:title>スタッフ一覧</template>

      <template v-slot:form>
        <el-form-item id="firstName" label="名" prop="firstName">
          <el-input v-model="form.firstName"></el-input>
        </el-form-item>
        <el-form-item id="lastName" label="姓" prop="lastName">
          <el-input v-model="form.lastName"></el-input>
        </el-form-item>
        <el-form-item id="email" label="Email" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item id="tel" label="Tel" prop="tel">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
      </template>

      <template v-slot:table>
        <el-table-column fixed="left" label="操作" width="100">
          <template slot-scope="scope">
            <el-button plain size="mini" type="primary" @click="goEdit(scope.row.id)">変更</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="firstName" label="名前"></el-table-column>
        <el-table-column prop="lastName" label="苗字"></el-table-column>
        <el-table-column prop="email" label="Email"></el-table-column>
        <el-table-column prop="tel" label="Tel"></el-table-column>
      </template>
    </list-layouts>
  </div>
</template>

<script>
import { staffApi } from "@/module/Api";
import { BaseList } from "@/views/base";

export default {
  name: "StaffList",
  mixins: [BaseList],

  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        tel: ""
      }
    };
  },

  methods: {
    callApi: where => staffApi.findAll(where) // <--- 個別に定義
  },

  computed: {
    screenId: () => "STAFF_LIST", // <--- 個別に定義
    namespace: () => "staff" // <--- 個別に定義
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
