/* eslint-disable promise/param-names */
import axios from 'axios';
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
} from '../actions/auth';
import ENDPOINT from '../actions/endpoint';
import {
  MAKE_REQUEST,
  FINISH_REQUEST,
  ERROR_REQUEST,
  CLEAR_REQUEST,
} from '../actions/request';

const state = {
  token: localStorage.getItem('user-token') || '',
  status: '',
  hasLoadedOnce: false,
  errorMessage: '',
};

const getters = {
  isAuthenticated: () => !!state.token,
  token: () => state.token,
};

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, payload) => {
    dispatch(MAKE_REQUEST);
    axios.get(`${ENDPOINT}oauth/v2/token`,
      {
        params: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          grant_type: process.env.GRANT_TYPE.password,
          username: payload.username,
          password: payload.password,
        },
      },
    )
      .then(({ data }) => {
        localStorage.setItem('user-token', data);
        commit(AUTH_SUCCESS, { token: data });
        dispatch(FINISH_REQUEST);
      })
      .then(() => {
        payload.router.push({ path: '/hello' });
      })
      .catch((e) => {
        dispatch(FINISH_REQUEST);
        dispatch(ERROR_REQUEST, { error: e.response.data.error });
      });
  },
  [AUTH_LOGOUT]: ({ commit, dispatch }, payload) => {
    commit(AUTH_LOGOUT);
    commit(CLEAR_REQUEST);
    axios.get(`${ENDPOINT}clean-stale-token`)
      .catch((e) => {
        dispatch(ERROR_REQUEST, { error: e });
      });
    localStorage.removeItem('user-token');
    payload.router.push({ path: '/' });
  },
};

/* eslint-disable */
const mutations = {
  [AUTH_SUCCESS]: (state, resp) => {
    state.token = resp.token;
    state.hasLoadedOnce = true;
  },
  [AUTH_LOGOUT]: (state) => {
    state.token = '';
    state.hasLoadedOnce = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
