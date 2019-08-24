<template>
  <simple-layouts>
    <template v-slot:title>callback</template>
  </simple-layouts>
</template>

<script>
import { Loading } from "element-ui";

export default {
  created() {
    const loadingInstance = Loading.service({ fullscreen: true });
    this.$nextTick(() => {
      loadingInstance.close();
      const { to } = this.$router.history.current.query;
      this.$router.push(to);
    });
  }
};
</script>
