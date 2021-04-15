import { createStore } from "vuex";

import user from "@/store/modules/user";
import post from "@/store/modules/post";

export default createStore({
  modules: {
    user,
    post,
  },
});
