<template>
  <p>callback</p>
</template>

<script>
import { authApi } from "@/module/Api";
import Config from "@/conf/Config";
import { SESSION_MUTATION_TYPES } from "@/store/modules/session";
import { MASTER_MUTATION_TYPES } from "@/store/modules/master";

export default {
  created() {
    this.$logger.info("Logged out", { id: this.session.username });
    authApi.logout().finally(() => {
      this.$store.commit(SESSION_MUTATION_TYPES.CLEAR_VALUES);
      this.$store.commit(MASTER_MUTATION_TYPES.CLEAR_VALUES);
      document.cookie = `${Config.COOKIE_ID}; max-age=0`;
      this.$router.push(Config.LOGIN_PATH);
    });
  }
};
</script>
