<template>
  <div class="container">
    <form @submit.prevent="handleEditPost">
      <div class="field">
        <label class="label">New title</label>
        <div class="control">
          <input
            v-model="title"
            class="input"
            type="text"
            placeholder="New title goes here..."
          />
        </div>
      </div>
      <div class="field">
        <div class="label">
          <label class="label">New Body</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <textarea
                v-model="body"
                class="textarea"
                placeholder="New post body goes here..."
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div v-if="error !== ''" class="my-3 has-text-weight-bold">
        <p class="has-text-danger">{{ error }}</p>
      </div>
      <div class="actions">
        <Button class="mb-3" :text="'Edit Post'" />
      </div>
    </form>
    <Button class="is-info" :text="'Back'" @click="goBack" />
  </div>
</template>

<script>
import Button from "@/components/Button";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "EditPost",
  components: {
    Button,
  },
  data() {
    return {
      error: "",
      title: "",
      body: "",
    };
  },
  computed: {
    ...mapGetters(["token", "post"]),
  },
  created() {
    this.getPostAction({ postId: this.$route.params.id, token: this.token });
  },
  unmounted() {
    this.clearPostAction();
  },
  methods: {
    ...mapActions(["editPostAction", "getPostAction", "clearPostAction"]),
    handleEditPost() {
      const newPost = {
        title: this.title,
        body: this.body,
      };
      this.editPostAction({
        postId: this.$route.params.id,
        post: newPost,
        token: this.token,
      })
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => {
          if (err.response.data.msg) {
            this.$swal.fire({
              icon: "error",
              title: `${err.response.data.msg}`,
              text: "Something went wrong!",
            });
            this.$router.push("/");
          } else {
            this.error = err.response.data.errors;
          }
        });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 650px !important;
}
</style>
