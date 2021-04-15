<template>
  <section class="container is-large">
    <div>
      <div
        class="is-flex is-justify-content-space-between is-align-items-center"
      >
        <h1 class="my-title">{{ post?.post.title }}</h1>
        <div class="is-clickable" @click="goBack">
          <i class="fas fa-arrow-left"></i>
        </div>
      </div>
      <p class="author">{{ post?.author }}</p>
    </div>
    <h4 class="subtitle mt-4">{{ post?.post.body }}</h4>
  </section>
  <section class="container my-4">
    <h3 class="title">Add Comment</h3>
    <AddComment />
  </section>
  <section class="container my-4">
    <h3 class="title">Comments</h3>
    <Comments />
  </section>
  <div @click="generatePDF">Generate PDF</div>
</template>

<script>
import Comments from "@/components/Comments";
import AddComment from "@/components/AddComment";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PostDetails",
  components: {
    Comments,
    AddComment,
  },
  computed: {
    ...mapGetters(["token", "post"]),
  },
  methods: {
    ...mapActions(["getPostAction", "clearPostAction", "generatePDFAction"]),
    generatePDF() {
      this.generatePDFAction({
        postId: this.$route.params.id,
        token: this.token,
      });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  created() {
    this.getPostAction({ postId: this.$route.params.id, token: this.token });
  },
  unmounted() {
    this.clearPostAction();
  },
};
</script>

<style lang="scss" scoped>
section:first-of-type {
  border-bottom: 2px solid #eee;
  padding: 5px 0 15px;
}

.my-title {
  font-weight: bold;
  font-size: 2rem;
}

.author {
  font-size: 0.8rem;
  font-style: italic;
}

.is-clickable {
  font-size: 2.2rem;
}
</style>
