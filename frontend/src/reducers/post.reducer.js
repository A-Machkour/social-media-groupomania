import { DELETE_POST, GET_POSTS } from "../actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    // case LIKEUNLIKE_POST:
    //   return {
    //     state.map((post) => {
    //       if (post._id === action.payload.postId) {
    //         post.likes.push(action.payload.userId);
    //       }
    //       return post;
    //     }),
    //   };
    case DELETE_POST:
      return state.filter(post => post.post_id !== action.payload.postId);
    default:
      return state;
  }
}
