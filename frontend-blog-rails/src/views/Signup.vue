<template>
  <div class="container">
    <form @submit.prevent="handleSignup">
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
      <div class="field">
        <label class="label">Password Confirmation</label>
        <div class="control has-icons-left has-icons-right">
          <input
            v-model="passwordConfirmation"
            class="input"
            type="password"
            placeholder="Your password again..."
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
          <Button class="button mb-4 is-link" :text="'Sign up'" />
        </div>
      </div>
    </form>
    <Button
      @click="$router.push('/signin')"
      class="button is-success"
      :text="'Already have an account?'"
    />
  </div>
</template>

<script>
import Button from "@/components/Button";

import { mapActions } from "vuex";

export default {
  name: "Signup",
  components: {
    Button,
  },
  data() {
    return {
      email: "",
      password: "",
      passwordConfirmation: "",
      error: "",
    };
  },
  methods: {
    ...mapActions(["registerAction"]),
    handleSignup() {
      const userDetails = {
        user: {
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation,
        },
      };
      this.registerAction(userDetails)
        .then(() => {
          this.resetForm();
          this.$router.push("/signin");
        })
        .catch((err) => {
          this.error = err.respose.data.error;
          this.resetForm();
        });
    },
    resetForm() {
      this.email = "";
      this.password = "";
      this.passwordConfirmation = "";
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px !important;
}

.is-success {
  width: 100%;
}
</style>
