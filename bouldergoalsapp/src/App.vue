<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
       <v-toolbar-title>
        <router-link 
          to="/"
          tag="span"
          style="cursor: pointer"
          >
        {{appTitle}}    
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/login"
        text
      >
        <span class="mr-2">Login</span>
      </v-btn>
        <v-btn to="/signup"
        text
      >
        <span class="mr-2">Signup</span>
      </v-btn>
    </v-app-bar>
    <v-content>
  <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    appTitle: 'BoulderGoals'
  }),
};
</script>
