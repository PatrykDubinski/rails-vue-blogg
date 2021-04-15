<template>
  <header class="px-5">
    <nav class="navbar">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">Blog</router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item" v-if="!isLoggedIn">
            <router-link to="/signin">Sign In</router-link>
          </div>
          <div class="navbar-item" v-if="!isLoggedIn">
            <router-link to="/signup">Sign Up</router-link>
          </div>
          <div class="navbar-item" v-if="isLoggedIn">
            <p class="is-clickable" @click="logout">Sign out</p>
          </div>
        </div>
        <div v-if="userMail !== ''" class="navbar-end">
          <div class="navbar-item">
            <p>{{ userMail }}</p>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Header",
  computed: {
    ...mapGetters(["isLoggedIn", "userMail"]),
  },
  methods: {
    ...mapActions(["logoutAction"]),
    logout() {
      this.logoutAction().then(() => {
        this.$router.push("/signin");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  height: 65px;
  background-color: #efefef;
  margin-bottom: 2rem;

  nav {
    height: 100%;
    background-color: #efefef;
  }
}
</style>
