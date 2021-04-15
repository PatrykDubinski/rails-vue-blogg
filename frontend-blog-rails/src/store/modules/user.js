import axios from "axios";
import { login, register } from "@/services/ApiHelper";

export default {
  state: {
    // user state
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    status: null,
  },
  mutations: {
    // user mutations

    // loading
    loadingMutation(state) {
      state.status = "loading";
    },

    // token and loading success
    loginSuccessMutation(state, { token, user }) {
      state.status = "success";
      state.token = token;
      state.user = user;
    },

    // loading to false
    loginFailMutation(state) {
      state.status = "fail";
      state.token = "";
      state.user = {};
    },

    registrationSuccessMutation(state) {
      state.status = "success";
    },

    registrationFailMutation(state) {
      state.status = "fail";
    },

    logoutMutation(state) {
      state.user = "";
      state.token = "";
      state.status = null;
    },
  },
  actions: {
    // user actions

    // call registerMutation
    registerAction({ commit }, user) {
      commit("loadingMutation");
      return new Promise((resolve, reject) => {
        register(user)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            commit("registrationFailMutation");
            reject(err);
          });
      });
    },

    // calls logoutMutation
    logoutAction({ commit }) {
      commit("logoutMutation");
      return new Promise((resolve) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        resolve();
      });
    },

    // calls loginMutation
    loginAction({ commit, dispatch }, user) {
      commit("loadingMutation");
      return new Promise((resolve, reject) => {
        login(user)
          .then((response) => {
            // succes

            const token = response.token;
            const user = response.user;
            commit("loginSuccessMutation", { token, user });
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            axios.defaults.headers.common["Authorization"] = token;
            dispatch("fetchAllPostsAction", token, { root: true });
            resolve(response);
          })
          .catch((err) => {
            // fail

            commit("loginFailMutation");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
  },

  getters: {
    isLoggedIn: (state) => state.token !== "",
    userMail: (state) => state.user.email,
    status: (state) => state.status,
    token: (state) => state.token,
    isAdmin: (state) => state.user.role === "admin",
  },
};
