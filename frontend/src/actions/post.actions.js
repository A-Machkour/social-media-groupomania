import axios from "axios";

// axios config
axios.defaults.baseURL = "http://localhost:5000/";
axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.timeout = 60000;
axios.defaults.withCredentials = true;

const setRequestConfig = queryParams => {
  const source = axios.CancelToken.source();
  let config = {
    cancelToken: source.token,
    params: {},
  };
  if (queryParams) {
    config.params = queryParams;
  }

  return config;
};

// posts

export const GET_POSTS = "GET_POSTS";
export const LIKEUNLIKE_POST = "LIKEUNLIKE_POST";
export const DELETE_POST = "DELETE_POST";

export const getPosts = () => {
  return dispatch => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/posts`, setRequestConfig())
      .then(res => {
        dispatch({ type: GET_POSTS, payload: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const likePost = (postId, userId) => {
  return dispatch => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/posts/${postId}/like`,
      data: {
        id: userId,
      },
    })
      .then(res => {
        dispatch({ type: LIKEUNLIKE_POST, payload: { postId, userId } });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const deletePost = postId => {
  return dispatch => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/posts/${postId}`,
    })
      .then(res => {
        dispatch({ type: DELETE_POST, payload: postId });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
