import Vue from 'vue';
import axios from 'axios';
import { USER_REQUEST, USER_SUCCESS, USER_REGISTER } from '../actions/user';
import { AUTH_LOGOUT } from '../actions/auth';
import { ERROR_REQUEST, MAKE_REQUEST, FINISH_REQUEST } from '../actions/request';
import ENDPOINT from '../actions/endpoint';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
const token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}

const state = { status: '', profile: localStorage.getItem('user-profile') || '{}', register: '' };

const getters = {
  getProfile: () => JSON.parse(state.profile),
  isRegister: () => !!state.register.name,
  isProfileLoaded: () => !!state.profile.name,
};

const actions = {
  [USER_REQUEST]: ({ commit, dispatch }, payload) => {
    axios.post(`${ENDPOINT}api/get-details`, {},
      { headers: {
        Authorization: `Bearer ${payload.token}`,
      } })
      .then(({ data }) => {
        commit(USER_SUCCESS, data.success);
        localStorage.setItem('user-profile', JSON.stringify(data.success));
      })
      .catch((e) => {
        dispatch(ERROR_REQUEST, { error: e });
      });
  },
  [USER_REGISTER]: ({ commit, dispatch }, payload) => {
    dispatch(MAKE_REQUEST);
    const dataUser = new FormData();
    dataUser.set('email', payload.email);
    dataUser.set('password', payload.password);
    dataUser.set('c_password', payload.c_password);
    dataUser.set('name', payload.name);
    dataUser.set('phone', payload.phone);

    axios.post(`${ENDPOINT}api/register`, dataUser,
      { headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      } })
      .then(({ data }) => {
        commit(USER_REGISTER, data.success);
        dispatch(FINISH_REQUEST);
      })
      .then(() => {
        payload.router.push({ path: '/' });
      })
      .catch((e) => {
        dispatch(ERROR_REQUEST, { error: e });
        dispatch(FINISH_REQUEST);
      });
  },
};

/* eslint-disable */
const mutations = {
  [USER_SUCCESS]: (state, resp) => {
    Vue.set(state, 'profile', JSON.stringify(resp));
  },
  [AUTH_LOGOUT]: (state) => {
    state.profile = '{}';
    state.register = '';
    localStorage.removeItem('user-profile');
  },
  [USER_REGISTER]: (state, payload) => {
    state.register = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
