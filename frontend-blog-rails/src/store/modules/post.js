import { getPosts } from "@/services/ApiHelper";
import {
  addComment,
  addPost,
  deletePost,
  editPost,
  getComments,
  getPDF,
  getPost,
} from "../../services/ApiHelper";

export default {
  state: {
    posts: [],
    post: {},
  },
  mutations: {
    fetchAllPostsMutation(state, posts) {
      state.posts = posts;
    },
    fetchAllPostsFailMutation(state) {
      state.posts = [];
    },
    getPostMutation(state, post) {
      state.post = post;
    },
    getCommentsMutation(state, comments) {
      state.post = {
        ...state.post,
        comments,
      };
    },
    addCommentMutation(state, comment) {
      const comments = state.post.comments;
      state.post = {
        ...state.post,
        comments: [...comments, comment],
      };
    },
    clearPostMutation(state) {
      state.post = {};
    },
  },
  actions: {
    fetchAllPostsAction({ commit }, token) {
      return new Promise((resolve, reject) => {
        getPosts(token)
          .then((res) => {
            commit("fetchAllPostsMutation", res);
            resolve(res);
          })
          .catch((err) => {
            commit("fetchAllPostsFailMutation");
            reject(err);
          });
      });
    },
    // eslint-disable-next-line no-unused-vars
    addPostAction({ commit, dispatch }, payload) {
      const { post, token } = payload;
      return new Promise((resolve, reject) => {
        addPost({ title: post.title, body: post.body }, token)
          .then((res) => {
            dispatch("fetchAllPostsAction", token, { root: true });
            resolve(res);
          })
          .catch((err) => {
            console.log(err.response);
            reject(err);
          });
      });
    },
    // eslint-disable-next-line no-unused-vars
    editPostAction({ commit, dispatch }, payload) {
      const { postId, post, token } = payload;
      return new Promise((resolve, reject) => {
        editPost(postId, { title: post.title, body: post.body }, token)
          .then((res) => {
            dispatch("fetchAllPostsAction", token, { root: true });
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // eslint-disable-next-line no-unused-vars
    deletePostAction({ commit, dispatch }, payload) {
      const { postId, token } = payload;
      return new Promise((resolve, reject) => {
        deletePost(postId, token)
          .then((res) => {
            dispatch("fetchAllPostsAction", token, { root: true });
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getPostAction({ commit }, payload) {
      const { postId, token } = payload;
      return new Promise((resolve, reject) => {
        getPost(postId, token)
          .then((res) => {
            commit("getPostMutation", res);
            resolve(res);
          })
          .catch((err) => {
            reject(err.response.data);
          });
      });
    },
    getCommentsAction({ commit }, payload) {
      const { postId, token } = payload;
      return new Promise((resolve, reject) => {
        getComments(postId, token)
          .then((res) => {
            commit("getCommentsMutation", res);
            resolve(res);
          })
          .catch((err) => {
            reject(err.response.data);
          });
      });
    },
    // eslint-disable-next-line no-unused-vars
    addCommentAction({ commit, dispatch }, payload) {
      const { postId, token, comment } = payload;
      return new Promise((resolve, reject) => {
        addComment(postId, token, comment)
          .then((res) => {
            commit("addCommentMutation", res);
            dispatch(
              "getPostAction",
              { postId: postId, token: token },
              { root: true }
            );
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    clearPostAction({ commit }) {
      commit("clearPostMutation");
    },
    // eslint-disable-next-line no-unused-vars
    generatePDFAction({ commit }, payload) {
      const { postId, token } = payload;
      return new Promise((resolve, reject) => {
        getPDF(postId, token)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  getters: {
    allPosts: (state) => state.posts,
    post: (state) => state.post.post,
    comments: (state) => state.post.comments,
  },
};
