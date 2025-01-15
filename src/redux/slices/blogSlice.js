import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../api';

const initialState = {
  isLoading: true,
  list: [],
  totalPosts: 0,
  lastMonthPosts: 0,
  pagination: {},
  isLoading: false,
  error: null,
  item: null,
};

const PostSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    getOneSuccess(state, action) {
      state.item = action.payload.posts[0];
      state.isLoading = false;
      state.error = null;
    },
    getAllSuccess(state, action) {
      state.list = action.payload.posts;
      state.totalPosts = action.payload.totalPosts;
      state.lastMonthPosts = action.payload.lastMonthPosts;
      state.isLoading = false;
      state.error = null;
      state.pagination = action.payload.pagination;
    },
    createSuccess(state, action) {
      state.list.push(action.payload.data);
      state.isLoading = false;
      state.error = null;
    },
    updateSuccess(state, action) {
      return {
        ...state,
        list: state.list.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
        isLoading: false,
        error: null,
      };
    },
    deleteSuccess(state, action) {
      return {
        ...state,
        list: state.list.filter((p) => p._id !== action.payload._id),
        isLoading: false,
        error: null,
      };
    },
  },
});

const { actions, reducer } = PostSlice;

export default reducer;

export const getListPost = (id) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const {data} = await api.getBlogs(id);
    dispatch(actions.getAllSuccess(data));
  } catch (e) {
    dispatch(actions.hasError(e));
  }
};


export const getPostById = (postId,userId) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.getBlogDetail(postId, userId);
    dispatch(actions.getOneSuccess(data));
  } catch (e) {
    dispatch(actions.hasError(e));
  }
};

export const createPost = (newPost) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.addPost(newPost);
    dispatch(actions.createSuccess(data));
  } catch (e) {
    dispatch(actions.hasError(e));
  }
};

export const updatePost = (id, updatePost) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.editPost(id, updatePost);
    dispatch(actions.updateSuccess(data));
  } catch (e) {
    dispatch(actions.hasError(e));
  }
};

export const deletePost = (postId,userId) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    await api.removePost(postId, userId);
    dispatch(actions.deleteSuccess(postId));
  } catch (e) {
    dispatch(actions.hasError(e));
  }
};

