<template>
  <form @submit.prevent="handleAddPost">
    <div class="field">
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input
              v-model="body"
              class="input is-medium"
              placeholder="Comment goes here..."
            />
          </div>
        </div>
      </div>
    </div>
    <div class="actions">
      <Button class="mr-3" :text="'Add Comment'" />
    </div>
  </form>
</template>

<script>
import Button from "@/components/Button";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AddComment",
  components: {
    Button,
  },
  data() {
    return {
      body: "",
    };
  },
  computed: {
    ...mapGetters(["token"]),
  },
  methods: {
    ...mapActions(["addCommentAction"]),
    resetForm() {
      this.body = "";
    },
    handleAddPost() {
      this.addCommentAction({
        postId: this.$route.params.id,
        token: this.token,
        comment: this.body,
      });
      this.resetForm();
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 650px !important;
}
</style>
