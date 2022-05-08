import {
  GET_USER,
  UPLOAD_PICTURE,
  UPDATE_USER,
  DELETE_USER,
} from "../actions/user.actions";
const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPLOAD_PICTURE:
      return {
        ...state,
        profil_picture: action.payload.image,
      };
    case UPDATE_USER:
      return {
        ...state,
        bio: action.payload.bio,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
      };
    case DELETE_USER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
