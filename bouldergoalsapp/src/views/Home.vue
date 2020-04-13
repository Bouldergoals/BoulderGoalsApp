<template>
  <v-container fluid pa-0 fill-height>
    <v-row align="center" class="text-center home-container">
      <v-col>
        <h2>Welcome to Boulder Goals</h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",

  data: () => ({
    images: {
      sample: require("../assets/boulder1.jpg")
    }
  })
};
</script>

<style scoped>
.row {
  height: 100%;
}
.home-container {
  background-image: url("../assets/boulder1.jpg");
}
</style>