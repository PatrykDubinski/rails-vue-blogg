<template>
  <div class="container">
    <form @submit.prevent="handleSignin">
      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left has-icons-right">
          <input
            v-model="email"
            class="input"
            type="email"
            placeholder="Your email..."
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <!-- <span class="icon is-small is-right">
          <i class="fas fa-exclamation-triangle"></i>
        </span> -->
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control has-icons-left has-icons-right">
          <input
            v-model="password"
            class="input"
            type="password"
            placeholder="Your password..."
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
          <!-- <span class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span> -->
        </div>
      </div>
      <div v-if="error !== ''" class="my-3 has-text-weight-bold">
        <p class="has-text-danger">{{ error }}</p>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <Button class="button is-link mb-4" :text="'Log in'" />
        </div>
      </div>
    </form>
    <Button
      class="button is-success has-text-white"
      :text="'Create an account'"
      @click="$router.push('/signup')"
    />
  </div>
</template>

<script>
import Button from "@/components/Button";

import { mapActions } from "vuex";

export default {
  name: "Signin",
  components: {
    Button,
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    ...mapActions(["loginAction"]),
    handleSignin() {
      const userDetails = {
        user: {
          email: this.email,
          password: this.password,
        },
      };
      this.loginAction(userDetails)
        .then(() => {
          this.resetForm();
          this.$router.push("/");
        })
        .catch((err) => {
          this.error = err.respose.data.error;
          this.resetForm();
        });
    },
    resetForm() {
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px !important;
}

.is-warning {
  width: 100%;
}
</style>
