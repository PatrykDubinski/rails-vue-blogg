<template>
  <Header />
  <router-view />
</template>

<script>
import Header from "@/components/Header.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Header,
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  created() {
    if (!this.isLoggedIn) this.$router.push("/signin");
  },
};
</script>

<style></style>
