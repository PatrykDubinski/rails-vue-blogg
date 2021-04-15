<template lang="">
  <div class="container">
    <Comment v-for="comment in comments" :key="comment.id" :comment="comment" />
  </div>
</template>

<script>
import Comment from "@/components/Comment";
import { mapGetters } from "vuex";

export default {
  name: "Comments",
  components: {
    Comment,
  },
  computed: {
    ...mapGetters(["comments"]),
  },
};
</script>

<style lang="scss" scoped></style>
