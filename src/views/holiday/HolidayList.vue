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
      <template v-slot:title>祝日一覧</template>

      <template v-slot:table>
        <el-table-column fixed="left" label="操作" width="100">
          <template slot-scope="scope">
            <el-button plain size="mini" type="primary" @click="goEdit(scope.row.id)">変更</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="holiday_name" label="祝日名"></el-table-column>
        <el-table-column prop="holiday_date" label="日付">
          <template slot-scope="scope">{{scope.row.holiday_date|YYYYMMDD}}</template>
        </el-table-column>
      </template>
    </list-layouts>
  </div>
</template>

<script>
import { holidayApi } from "@/module/Api";
import { BaseList } from "@/views/base";

export default {
  name: "HolidayList",
  mixins: [BaseList],

  methods: {
    callApi: where => holidayApi.findAll(where) // <--- 個別に定義
  },

  computed: {
    screenId: () => "HOLIDAY_LIST", // <--- 個別に定義
    namespace: () => "holiday" // <--- 個別に定義
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
