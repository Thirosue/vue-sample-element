<template>
  <transition name="fade">
    <el-form-item v-if="errorVisible">
      <el-alert type="error">
        <ul>
          <li v-for="message in messages" :key="message">{{message}}</li>
        </ul>
      </el-alert>
    </el-form-item>
  </transition>
</template>

<script>
import { isNotEmpty } from "@/helpers/validators";

export default {
  props: {
    messages: {
      type: Array,
      required: true
    }
  },
  computed: {
    errorVisible() {
      return this.messages.some(message => isNotEmpty(message));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  font-size: 1.2em;
  list-style: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
