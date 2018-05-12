import Vue from 'vue';
import Router from 'vue-router';
import 'vuetify/dist/vuetify.css';
import Vuetify from 'vuetify';
import Hello from '@/components/Hello';
import Login from '@/components/Login';
import Registration from '@/components/Registration';
import store from '../store';

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/hello');
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

Vue.use(Vuetify, {
  theme: {
    primary: '#039BE5',
    secondary: '#78909C',
    accent: '#90A4AE',
    error: '#F4511E',
    warning: '#FBC02D',
    info: '#64B5F6',
    success: '#81C784',
  },
  options: {
    themeVariations: ['primary', 'secondary', 'accent', 'error', 'warning', 'info', 'success'],
  },
});

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello,
      beforeEnter: ifAuthenticated,
    },
  ],
});
