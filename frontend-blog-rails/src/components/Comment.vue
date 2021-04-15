<template lang="">
  <div class="comment" v-if="comment">
    <div class="comment-inner">
      <p class="body">{{ comment?.comment?.body }}</p>
      <p class="author">{{ comment?.user?.email }}</p>
    </div>
    <div>
      <span class="date"
        >created
        {{ new Date(comment?.comment.created_at).toLocaleDateString() }}
        {{ new Date(comment?.comment.created_at).toLocaleTimeString() }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: {
    comment: Object,
  },
};
</script>
<style lang="scss" scoped>
.comment {
  margin: 40px 0;

  .date {
    float: right;
    font-size: 0.9rem;
    font-style: italic;
  }

  .comment-inner {
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 11px;

    .author {
      font-size: 0.8rem;
      font-style: italic;
    }

    .body {
      font-size: 1.4rem;
    }
  }
}
</style>
