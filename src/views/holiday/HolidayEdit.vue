<template>
  <div class="holiday-edit">
    <edit-layouts ref="edit" :form.sync="form" :rules="rules" :update="update" :back="back">
      <template v-slot:title>祝日登録・変更</template>
      <template v-slot:form>
        <el-form-item id="holiday_name" label="祝日名" prop="holiday_name">
          <el-input v-model="form.holiday_name"></el-input>
        </el-form-item>
        <el-form-item id="holiday_date" label="日付" prop="holiday_date">
          <date-picker v-model="form.holiday_date"></date-picker>
        </el-form-item>
      </template>
    </edit-layouts>
  </div>
</template>

<script>
import { DatePicker } from "@/components/form";
import { required } from "@/conf/ValidatotionRule";
import { holidayApi } from "@/module/Api";
import { BaseEdit } from "@/views/base";

export default {
  components: {
    DatePicker
  },

  name: "HolidayEdit",
  mixins: [BaseEdit],

  data() {
    return {
      form: {
        holiday_name: "",
        holiday_date: ""
      },
      rules: {
        holiday_name: required("祝日名"),
        holiday_date: required("日付")
      }
    };
  },

  mounted() {
    this.$logger.info("start HolidayEdit!");
  },

  methods: {
    callFindById: id => holidayApi.findById(id), // OverRide
    callUpdate: data => holidayApi.update(data), // OverRide
    callCreate: data => holidayApi.create(data) // OverRide
  },

  computed: {
    screenId: () => "HOLIDAY_EDIT", // OverRide
    namespace: () => "holiday" // OverRide
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.holiday-edit >>> #holiday_date {
  text-align: left;
}
</style>
