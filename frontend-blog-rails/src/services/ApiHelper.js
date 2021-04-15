import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_RAILS_API_URL;

// authorization

export const login = async (userDetails) => {
  const res = await axios.post("/users/sign_in", userDetails);
  return res.data;
};

export const register = async (user) => {
  const res = await axios.post("/users", user);
  return res.data;
};

// posts

export const getPosts = async (token) => {
  const res = await axios.get("/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const addPost = async (post, token) => {
  const res = await axios.post(
    "/posts",
    {
      post,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const editPost = async (postId, post, token) => {
  const res = await axios.put(
    `/posts/${postId}`,
    {
      post,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const deletePost = async (postId, token) => {
  return await axios.delete(`/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPost = async (postId, token) => {
  const resPost = await axios.get(`/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const resCom = await axios.get(`/posts/${postId}/comments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return {
    post: {
      post: resPost.data.post,
      author: resPost.data.author,
    },
    comments: resCom.data.comments,
  };
};

export const getComments = async (postId, token) => {
  const res = await axios.get(`/posts/${postId}/comments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const addComment = async (postId, token, comment) => {
  const res = await axios.post(
    `/posts/${postId}/comments`,
    {
      comment: {
        body: comment,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const getPDF = async (postId, token) => {
  await axios
    .get(`/posts/${postId}/pdf`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "arraybuffer",
    })
    .then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "post.pdf");
      document.body.appendChild(link);
      link.click();
    });
};
