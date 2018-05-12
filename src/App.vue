<template>
    <v-app>
      <v-navigation-drawer
       fixed
       clipped
       app
       v-model="naviBar"
       v-if="isAuthenticated"
      >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" >
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>jaka</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="blue-grey ">power_settings_new</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-btn flat color="blue-grey " @click="logout" value="logout">
              <span class="margin--icon">Logout</span>
            </v-btn>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
   </v-navigation-drawer>

     <v-toolbar
      color="blue-grey "
      clipped-left
      fixed
      app
     >
       <v-toolbar-side-icon v-if="isAuthenticated" color="white--text" @click.stop="naviBar = !naviBar"></v-toolbar-side-icon>
       <v-toolbar-title class="white--text">AIS</v-toolbar-title>
       <v-spacer></v-spacer>
     </v-toolbar>
     <v-container class="vertical--scroll">
        <div  v-if="requestStatus === 'loading'">
          <v-dialog v-model="loader" persistent fullscreen content-class="loading">
            <v-container fill-height>
              <v-layout row justify-center align-center>
                <v-progress-circular indeterminate :size="70" :width="7" color="blue-grey "></v-progress-circular>
              </v-layout>
            </v-container>
          </v-dialog>
        </div>
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
     </v-container>
     <!-- <v-bottom-nav
      v-if="isAuthenticated"
      absolute :value="true"
      :active.sync="selectedTab"
      class="fixed-bottom">
       <v-btn flat color="blue-grey " value="hello" @click="helloAction">
         <span>Home</span>
         <v-icon>home</v-icon>
       </v-btn>
       <v-btn flat color="blue-grey " value="places" @click="placesAction">
         <span>Store</span>
         <v-icon>place</v-icon>
       </v-btn>
       <v-btn flat color="blue-grey " value="history" @click="historyAction">
         <span>History</span>
         <v-icon>history</v-icon>
       </v-btn>
       <v-btn flat color="blue-grey " value="settings" @click="settingsAction">
         <span>Settings</span>
         <v-icon>settings</v-icon>
       </v-btn>
     </v-bottom-nav> -->
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import { AUTH_LOGOUT } from './store/actions/auth';

const uriArr = window.location.href.split('/');
export default {
  name: 'app',
  data() {
    return {
      naviBar: false,
      selectedTab: uriArr[uriArr.length - 1] ? uriArr[uriArr.length - 1] : 'hello',
      loader: true,
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'requestStatus', 'token', 'getProfile']),
  },
  mounted: () => {
  },
  beforeMount: () => {
  },
  destroyed: () => {
  },
  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT, { router: this.$router, token: this.token });
      this.naviBar = false;
    },
    helloAction() {
      this.$router.push({ path: '/hello' });
    },
  },
};
</script>

<style>
.loading {
  background-color: rgba(208, 204, 204, 0.39);
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.margin--icon {
  margin-top: -8px;
  margin-left: -30px;
}
.vertical--scroll {
  overflow-y: scroll;
  margin-bottom: 54px !important;
}
.fixed-bottom {
  position: fixed !important;
}
</style>
