<template>
  <div>
    <app-header></app-header>

    <el-container>
      <app-navbar></app-navbar>

      <el-main id="main">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-header>
            <!-- setting title -->
            <slot name="title"></slot>
          </el-header>

          <!-- setting form -->
          <slot name="form"></slot>

          <el-form-item>
            <el-container class="button-area">
              <el-button type="info" id="form-back" icon="el-icon-back" @click.prevent="back">戻る</el-button>
              <el-button
                type="primary"
                id="form-submit"
                icon="el-icon-magic-stick"
                @click.prevent="update"
                :disabled="processing"
              >更新</el-button>
            </el-container>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { COMMON_MESSAGE } from "@/conf/Message";

/*
 * LayOutに関わる実装のみ記載
 */
export default {
  props: {
    form: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    },
    update: {
      type: Function,
      required: true
    },
    back: {
      type: Function,
      required: true
    }
  },
  methods: {
    validate() {
      return new Promise(resolve => {
        this.$refs.form.validate(valid => {
          if (valid) {
            resolve();
          } else {
            this.$confirm(COMMON_MESSAGE.VALID_ERR, "", {
              confirmButtonText: "OK",
              type: "warning",
              showCancelButton: false,
              showConfirmButton: true
            });
          }
        });
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
