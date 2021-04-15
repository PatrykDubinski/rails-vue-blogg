import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/signin",
    name: "Signin",
    component: () => import("../views/Signin.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/Signup.vue"),
  },
  {
    path: "/posts/admin/add",
    name: "AddPost",
    component: () => import("../views/AddPost.vue"),
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
  },
  {
    path: "/posts/admin/edit/:id",
    name: "EditPost",
    component: () => import("../views/EditPost.vue"),
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
    props: true,
  },
  {
    path: "/posts/:id",
    name: "PostDetails",
    component: () => import("../views/PostDetails.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("token") == null) {
      next({
        path: "/signin",
        params: { nextUrl: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.isAdmin)) {
    if (store.getters.isAdmin) {
      next();
      return;
    }
  } else {
    next();
  }
});

export default router;
