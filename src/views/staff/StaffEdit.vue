<template>
  <edit-layouts ref="edit" :form.sync="form" :rules="rules" :update="update" :back="back">
    <template v-slot:title>スタッフ登録・変更</template>
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
  </edit-layouts>
</template>

<script>
import { email, required } from "@/conf/ValidatotionRule";
import { staffApi } from "@/module/Api";
import { BaseEdit } from "@/views/base";

export default {
  name: "StaffEdit",
  mixins: [BaseEdit],

  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        tel: ""
      },
      rules: {
        firstName: required("名"),
        lastName: required("姓"),
        email
      }
    };
  },

  mounted() {
    this.$logger.info("start StaffEdit!");
  },

  methods: {
    callFindById: id => staffApi.findById(id), // OverRide
    callUpdate: data => staffApi.update(data), // OverRide
    callCreate: data => staffApi.create(data) // OverRide
  },

  computed: {
    screenId: () => "STAFF_EDIT", // OverRide
    namespace: () => "staff" // OverRide
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
