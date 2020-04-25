<template>
  <v-container fill-height pa-1>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Signup form</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field label="Name" name="name" v-model="name" type="text" />
              <v-text-field label="Email" name="email" v-model="email" type="email" />
              <v-text-field
                id="password"
                label="Password"
                name="password"
                v-model="password"
                type="password"
              />
              <v-text-field
                id="password_confirmation"
                label="Password Confirmation"
                name="password_confirmation"
                v-model="passwordConfirmation"
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="signup()">Signup</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    response: ""
  }),
  methods: {
    signup() {
      this.$axios
        .post("http://bouldergoals.test/api/users", {
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation,
          name: this.name
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
