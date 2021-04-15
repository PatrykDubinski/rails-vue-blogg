<template>
  <div class="container py-6">
    <router-link v-if="isAdmin" to="/posts/admin/add"
      ><Button :classString="'addPost'" :text="'Add Post'"
    /></router-link>
    <Posts />
  </div>
</template>

<script>
import Button from "@/components/Button";
import Posts from "@/components/Posts";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    Button,
    Posts,
  },
  computed: {
    ...mapGetters(["isAdmin", "token"]),
  },
};
</script>

<style scoped>
.container {
  position: relative;
}
</style>
