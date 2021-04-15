<template>
  <div class="card my-5">
    <header
      class="pr-3 is-align-items-center card-header is-flex is-justify-content-space-between"
    >
      <p class="card-header-title">
        {{ post.title }}
      </p>
      <div
        class="is-align-items-center icons is-flex is-justify-content-space-between"
      >
        <div v-if="isAdmin" @click="deletePost">
          <i class="fas fa-trash"></i>
        </div>
        <router-link v-if="isAdmin" :to="`/posts/admin/edit/${post.id}`"
          ><i class="fas fa-pen"></i
        ></router-link>
        <router-link :to="`/posts/${post.id}`"
          ><i class="fas fa-eye"></i
        ></router-link>
      </div>
    </header>
    <div class="card-content">
      <div class="content">
        {{ post.body }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Post",
  props: {
    post: Object,
  },
  computed: {
    ...mapGetters(["token", "isAdmin"]),
  },
  methods: {
    ...mapActions(["deletePostAction"]),
    deletePost() {
      this.deletePostAction({
        postId: this.post.id,
        token: this.token,
      })
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => {
          this.$swal.fire({
            icon: "error",
            title: `${err.response.data.msg}`,
            text: "Something went wrong!",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  flex: 1;
}
.icons {
  flex: 0.1;
  font-size: 1.2rem;

  .fa-trash:hover {
    color: red;
    cursor: pointer;
    transition: color 0.3s ease-in-out;
  }

  .fa-pen:hover {
    cursor: pointer;
    color: slateblue;
    transition: color 0.3s ease-in-out;
  }

  a {
    color: #4a4a4a;
    text-decoration: none;
    display: inherit;

    .fa-eye:hover {
      cursor: pointer;
      color: green;
      transition: color 0.3s ease-in-out;
    }
  }
}
</style>
