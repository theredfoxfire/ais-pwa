/* eslint-disable promise/param-names */
import axios from 'axios';
import {
  MAKE_REQUEST,
  FINISH_REQUEST,
  ERROR_REQUEST,
  CLEAR_REQUEST,
} from '../actions/request';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
const token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}

const state = {
  status: '',
  errorMessage: '',
};

const getters = {
  requestStatus: () => state.status,
  errorMessage: () => state.errorMessage,
};

const actions = {
  [MAKE_REQUEST]: ({ commit }) => {
    commit(MAKE_REQUEST);
  },
  [FINISH_REQUEST]: ({ commit }) => {
    commit(FINISH_REQUEST);
  },
  [CLEAR_REQUEST]: ({ commit }) => {
    commit(CLEAR_REQUEST);
  },
  [ERROR_REQUEST]: ({ commit }, payload) => {
    commit(ERROR_REQUEST, payload.error);
  },
};

/* eslint-disable */
const mutations = {
  [MAKE_REQUEST]: (state) => { state.status = 'loading'; },
  [FINISH_REQUEST]: (state) => { state.status = 'finish'; },
  [CLEAR_REQUEST]: (state) => {
    state.status = '';
    state.errorMessage = '';
  },
  [ERROR_REQUEST]: (state, e) => {
    state.errorMessage = e;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
