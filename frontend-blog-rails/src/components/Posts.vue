<template>
  <div v-for="post in allPosts" :key="post.id" class="container">
    <Post :post="post" />
  </div>
</template>

<script>
import Post from "@/components/Post";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Posts",
  components: {
    Post,
  },
  computed: {
    ...mapGetters(["allPosts", "token"]),
  },
  methods: {
    ...mapActions(["fetchAllPostsAction"]),
  },
  created() {
    this.fetchAllPostsAction(this.token);
  },
};
</script>

<style lang=""></style>
