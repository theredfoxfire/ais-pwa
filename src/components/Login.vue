<template>
  <v-layout row wrap style="form-container">
    <v-alert outline color="error" v-if="errorMessage" icon="warning" :value="true">
      Sign In failed, please doble check your username and password.
    </v-alert>
    <v-alert type="success" :value="true" v-if="isRegister">
      Registration success! Please Sign in to countinue.
    </v-alert>
    <v-flex xs12 class="text-xs-center" mt-5>
      <h1>Sign In</h1>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 mt-3>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field
          label="Username"
          v-model="username"
          :rules="usernameRules"
          required
        ></v-text-field>
        <v-text-field
          label="Enter your password"
          v-model="password"
          :rules="passwordRules"
          :append-icon="e1 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e1 = !e1)"
          :type="e1 ? 'password' : 'text'"
          required
        ></v-text-field>

        <v-btn
          @click="submit"
          :disabled="!valid"
          color="blue-grey  white--text"
        >
          Sign in
        </v-btn>
        <v-btn outline @click="register" color="blue-grey ">Register</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { AUTH_REQUEST } from '../store/actions/auth';

  export default {
    data: () => ({
      valid: true,
      e1: true,
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
      ],
      username: '',
      usernameRules: [
        v => !!v || 'Username is required',
        // v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
      ],
    }),
    computed: {
      ...mapGetters(['isAuthenticated', 'authStatus', 'errorMessage', 'isRegister']),
    },
    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          const payload = { router: this.$router, username: this.username, password: this.password };
          this.$store.dispatch(AUTH_REQUEST, payload);
        }
      },
      register() {
        this.$router.push({ path: '/register' });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.form-container {
  margin-top: 25%;
}
</style>
