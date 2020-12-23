import {
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  SEND_POST,
  SET_POST,
  SUBMIT_COMMENT,
} from '../type';

const initialState = {
  posts: [],
  post: {},
  loading: false,
};

export default function (state = initialState, action) {
  console.log('data reducer', action);
  switch (action.type) {
    case LOADING_DATA:
      return { ...state, loading: true };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case SET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    case LIKE_POST:
    case UNLIKE_POST:
      var index = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
      );
      state.posts[index] = action.payload;
      if (state.post.postId === action.payload.postId) {
        state.post = action.payload;
      }
      return {
        ...state,
      };
    case DELETE_POST:
      index = state.posts.findIndex((post) => post.postId === action.payload);
      state.posts.splice(index, 1);
      return { ...state };
    case SEND_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          postData: {
            ...state.post.postData,
            comments: [action.payload, ...state.post.postData.comments],
          },
        },
      };

    default:
      return state;
  }
}
