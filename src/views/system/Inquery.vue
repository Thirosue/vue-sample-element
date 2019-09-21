<template>
  <div>
    <app-header></app-header>

    <el-container>
      <app-navbar></app-navbar>

      <el-main id="main" class="inquery">
        <el-form ref="form" :model="form" :rules="rules">
          <el-container>
            <el-aside>
              <!-- setting title -->
              <el-header>お問い合わせ</el-header>
              <!--Error Area-->
              <error-area></error-area>
            </el-aside>
            <el-container>
              <el-header style="text-align: right;">
                <el-button
                  type="primary"
                  id="form-add"
                  icon="el-icon-plus"
                  @click.prevent="add"
                >子供追加</el-button>
                <el-button
                  type="info"
                  id="form-remove"
                  icon="el-icon-minus"
                  @click.prevent="remove"
                >子供削除</el-button>
              </el-header>
            </el-container>
          </el-container>

          <!-- setting form -->
          <span class="form">
            <el-form-item id="title" label="タイトル" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item id="name" label="名前" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item id="email" label="Email" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item id="category" label="カテゴリ" prop="category">
              <single-options v-model="form.category" :options="inquiryCategoryOptions" />
            </el-form-item>
            <el-form-item id="genre" label="ジャンル" prop="genre">
              <multiple-checkbox v-model="form.genre" :options="inquiryGenreOptions" />
            </el-form-item>
            <el-form-item id="body" label="本文" prop="body">
              <el-input type="textarea" v-model="form.body" :rows="5"></el-input>
            </el-form-item>
          </span>

          <template v-if="form.children.length !== 0">
            <el-divider>
              <i class="el-icon-star-on"></i>
            </el-divider>

            <el-header style="font-size: 1em">お子様の情報</el-header>

            <el-table class="child-table" :data="form.children" style="width: 100%">
              <el-table-column prop="index" label="#" width="50">
                <template slot-scope="scope">{{scope.row.key+1}}</template>
              </el-table-column>
              <el-table-column prop="name" label="名前" width="500">
                <template slot-scope="scope">
                  <el-form-item
                    :key="scope.row.key"
                    :prop="`children.${scope.row.key}.name`"
                    :rules="required('名前')"
                  >
                    <el-input v-model="scope.row.name"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="type" label="性別">
                <template slot-scope="scope">
                  <el-form-item>
                    <single-options :options="sexOptions" v-model="scope.row.sex" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="type" label="誕生日">
                <template slot-scope="scope">
                  <el-form-item
                    :key="scope.row.key"
                    :prop="`children.${scope.row.key}.birthDay`"
                    :rules="required('誕生日')"
                  >
                    <date-picker v-model="scope.row.birthDay"></date-picker>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
          </template>

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
import ErrorHandler from "@/module/ErrorHandler";
import { SingleOptions, MultipleCheckbox, DatePicker } from "@/components/form";
import { email, required } from "@/conf/ValidatotionRule";
import { masterApi, inquiryApi } from "@/module/Api";
import { BaseEdit } from "@/views/base";
import { MUTATION_TYPES } from "@/store";
import { convertKeys } from "@/helpers";
import { COMMON_MESSAGE } from "@/conf/Message";

const child = {
  name: "",
  sex: "male",
  birthDay: ""
};

export default {
  components: {
    SingleOptions,
    MultipleCheckbox,
    DatePicker
  },

  name: "Inquery",
  mixins: [BaseEdit],

  props: {
    required: {
      type: Function,
      default: required
    }
  },

  data() {
    return {
      form: {
        name: "",
        email: "",
        category: "",
        genre: [],
        title: "",
        body: "",
        children: []
      },
      rules: {
        name: required("名前"),
        email,
        category: required("カテゴリ"),
        title: required("タイトル"),
        body: required("本文")
      },
      inquiryCategoryOptions: [],
      inquiryGenreOptions: [],
      sexOptions: []
    };
  },

  async created() {
    let response = await masterApi.getInquiryCategory();
    this.inquiryCategoryOptions = response.map(val =>
      convertKeys(val, ["value", "key"], ["text", "value"])
    );

    response = await masterApi.getInquiryGenre();
    this.inquiryGenreOptions = response.map(val =>
      convertKeys(val, ["value", "key"], ["text", "value"])
    );

    response = await masterApi.getSex();
    this.sexOptions = response.map(val =>
      convertKeys(val, ["value", "key"], ["text", "value"])
    );
  },

  methods: {
    add() {
      this.form.children.push({ ...child, key: this.form.children.length });
    },
    remove() {
      this.form.children.pop();
    },
    update() {
      if (this.processing) {
        return;
      }
      this.$logger.info(
        `Update Action at ${this.currentName} ${JSON.stringify(
          this.notNullValue
        )}`
      );

      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.commit(MUTATION_TYPES.SET_PROCESSING, true);
          inquiryApi
            .create(this.notNullValue)
            .then(() => {
              this.$store.commit(MUTATION_TYPES.SET_PROCESSING, false);
              this.$router.push({
                path: this.completePath,
                query: { to: this.listPath }
              });
            })
            .catch(ErrorHandler.apiHandleErr)
            .finally(() =>
              this.$store.commit(MUTATION_TYPES.SET_PROCESSING, false)
            );
        } else {
          this.$confirm(COMMON_MESSAGE.VALID_ERR, "", {
            confirmButtonText: "OK",
            type: "warning",
            showCancelButton: false,
            showConfirmButton: true
          });
        }
      });
    },
    back() {
      window.history.back();
    }
  },

  computed: {
    screenId: () => "INQUERY", // OverRide
    namespace: () => "inquery" // OverRide
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.inquery .form >>> .el-form-item__content {
  text-align: left;
}
</style>
