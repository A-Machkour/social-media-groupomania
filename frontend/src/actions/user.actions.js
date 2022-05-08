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

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

export const getUser = uid => {
  return dispatch => {
    return axios
      .get(
        `${process.env.REACT_APP_API_URL}api/users/${uid}`,
        setRequestConfig()
      )
      .then(res => {
        dispatch({
          type: GET_USER,
          payload: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const uploadPicture = (uid, data) => {
  return dispatch => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/users/${uid}/upload`, data)
      .then(res => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/users/${uid}/upload`)
          .then(res => {
            console.log("uploadPicture", res.data);
            dispatch({
              type: UPLOAD_PICTURE,
              payload: res.data.image,
            });
            console.log("uploadPicture", res.data.image);
          })
          .catch(err => {
            console.log(err);
          });
      });
  };
};
export const updateUser = (uid, data) => {
  return dispatch => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}api/users/${uid}`, data)
      .then(res => {
        dispatch({
          type: UPDATE_USER,
          payload: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const deleteUser = uid => {
  return dispatch => {
    return axios
      .delete(`${process.env.REACT_APP_API_URL}api/users/${uid}`)
      .then(res => {
        dispatch({
          type: DELETE_USER,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
