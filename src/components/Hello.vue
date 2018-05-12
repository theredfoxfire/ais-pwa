<template>
  <v-layout justify-space-around>
    <v-icon large color="green darken-2">business</v-icon>

    <v-icon large color="blue darken-2">chat</v-icon>

    <v-icon large color="purple darken-2">dialpad</v-icon>

    <v-icon large color="blue-grey  darken-2">email</v-icon>

    <v-icon large color="blue-grey darken-2">call_split</v-icon>

    <v-icon large color="orange darken-2">present_to_all</v-icon>
  </v-layout>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js PWA',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
