<template>
  <v-container fill-height pa-1>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
               label="Email"
                name="email"
                prepend-icon="mdi-account"
                v-model="email"
                type="email"
              />

              <v-text-field
                id="password"
                label="Password"
                name="password"
                v-model="password"
                prepend-icon="mdi-lock"
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="login()">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    source: String
  }
};
</script>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
    response: "",
  }),
  methods: {
    login() {
      this.$axios
        .post("http://bouldergoals.test/oauth/token", {
          grant_type: "password",
          client_id: 2,
          client_secret: "axRhKwudPT9e6smaYzbe5TLk3U8CUpLv2lGO8EF6",
          username: this.email,
          password: this.password
        })
        .then(response => {
          this.response = response.data.bpi
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
    }
  }
};
</script>