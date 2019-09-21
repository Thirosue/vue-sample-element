<template>
  <div>
    <el-container>
      <el-main style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
        <el-header>Login Form</el-header>
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
          <!--Error Area-->
          <error-area></error-area>
          <el-form-item id="email" label="email" prop="email">
            <el-input placeholder="Please input email" v-model="loginForm.email"></el-input>
          </el-form-item>
          <el-form-item id="password" label="password" prop="password">
            <el-input
              placeholder="Please input password"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" id="form-submit" @click.prevent="signin">Login</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Config from "@/conf/Config";
import { email, required } from "@/conf/ValidatotionRule";
import { MUTATION_TYPES } from "@/store";
import { SESSION_MUTATION_TYPES } from "@/store/modules/session";
import { MASTER_MUTATION_TYPES } from "@/store/modules/master";
import { LOGIN_MESSAGE } from "@/conf/Message";
import { authApi } from "@/module/Api";
import ErrorTracking from "@/module/ErrorTracking";
import ErrorHandler from "@/module/ErrorHandler";

export default {
  name: "Login",

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path === Config.LOGOUT_PATH) {
        vm.$message(LOGIN_MESSAGE.LOGOUTED);
      }
    });
  },

  data() {
    return {
      loginForm: {
        email: "sample@sample.com",
        password: "password"
      },
      loginRules: {
        email,
        password: required("パスワード")
      }
    };
  },

  created() {
    document.cookie = Config.FUNCTION_ID + this.screenId;
    this.$store.commit(MUTATION_TYPES.SET_PROCESSING, false);
    this.$store.commit(MUTATION_TYPES.SET_ERROR_MESSAGES, []);
    this.$store.commit(MASTER_MUTATION_TYPES.CLEAR_VALUES);
    this.$store.commit(SESSION_MUTATION_TYPES.CLEAR_VALUES);
  },

  methods: {
    signin() {
      this.errMsg = null;
      this.login.validate(valid => {
        if (valid) {
          authApi
            .doAuth({
              email: this.login.model.email,
              password: this.login.model.password
            })
            .then(response => {
              localStorage.clear();
              const session = response.data[0];
              ErrorTracking.configureScope(session);
              this.$store.commit(SESSION_MUTATION_TYPES.SET_VALUES, session);
              this.$router.push("/");
            })
            .catch(error => {
              if (error.response.status === 401) {
                this.$store.commit(MUTATION_TYPES.SET_ERROR_MESSAGES, [
                  LOGIN_MESSAGE.ERR_AUTH
                ]);
              } else {
                ErrorHandler.apiHandleErr(error.response);
              }
            });
        }
      });
    }
  },
  computed: {
    screenId: () => "LOGIN",
    login() {
      return this.$refs.loginForm;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  margin: 100px 300px 100px 300px;
  display: flex;
  flex-direction: column;
  min-height: 26vh;
}
</style>
