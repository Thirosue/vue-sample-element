<template>
  <div>
    <app-header></app-header>

    <el-container>
      <app-navbar></app-navbar>

      <el-main id="main">
        <el-form :model="form" ref="form">
          <el-container>
            <el-aside>
              <!-- setting title -->
              <el-header>
                <slot name="title"></slot>
              </el-header>
              <!--Error Area-->
              <error-area></error-area>
            </el-aside>
            <el-container>
              <el-header style="text-align: right;">
                <el-button
                  type="primary"
                  id="form-download"
                  icon="el-icon-magic-stick"
                  @click.prevent="goCreate"
                  v-if="goCreate"
                >新規登録</el-button>
              </el-header>
            </el-container>
          </el-container>

          <!-- search panel implements -->
          <slot name="form"></slot>

          <el-form-item>
            <el-container>
              <el-aside v-if="showResult" width="200px">{{count}}件ヒットしました</el-aside>
              <el-container>
                <el-aside width="100px" v-if="showResult">
                  <el-form-item v-if="showResult">
                    <el-select @change="search(1, form.rows)" v-model="form.rows">
                      <el-option label="1件" :value="1"></el-option>
                      <el-option label="10件" :value="10"></el-option>
                      <el-option label="50件" :value="50"></el-option>
                      <el-option label="100件" :value="100"></el-option>
                    </el-select>
                  </el-form-item>
                </el-aside>
                <el-container>
                  <el-header style="text-align: right;">
                    <el-button
                      type="primary"
                      id="form-submit"
                      icon="el-icon-search"
                      @click.prevent="search(1)"
                    >検索</el-button>
                    <el-button
                      type="primary"
                      id="form-download"
                      icon="el-icon-download"
                      @click.prevent="download"
                      v-if="download"
                    >ダウンロード</el-button>
                  </el-header>
                </el-container>
              </el-container>
            </el-container>
          </el-form-item>
        </el-form>

        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="search"
          :current-page.sync="page"
          :page-size="form.rows"
          :total="count"
          v-if="showResult"
        ></el-pagination>

        <span id="result-list">
          <el-table
            v-if="searched"
            v-loading="processing"
            :data="results"
            style="width: 100%"
            stripe
          >
            <!-- table column settings-->
            <slot name="table"></slot>
            <span slot="empty">検索結果がありません</span>
          </el-table>
        </span>

        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="search"
          :current-page.sync="page"
          :page-size="form.rows"
          :total="count"
          v-if="showResult"
        ></el-pagination>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { MUTATION_TYPES } from "@/store";

/*
 * LayOutに関わる実装のみ記載
 */
export default {
  props: {
    results: {
      type: Array,
      required: true
    },
    form: {
      type: Object,
      required: true
    },
    search: {
      type: Function,
      required: true
    },
    goCreate: {
      type: Function
    },
    download: {
      type: Function
    },
    count: {}
  },
  data: () => ({
    searched: false
  }),
  computed: {
    page: {
      get() {
        return this.$store.state.page;
      },
      set(value) {
        this.$store.commit(MUTATION_TYPES.SET_PAGE, value);
      }
    },
    showResult() {
      return this.results.length > 0;
    }
  },
  watch: {
    processing(value) {
      if (value) {
        this.searched = true;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
