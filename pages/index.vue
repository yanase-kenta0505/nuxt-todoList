<template>
  <v-app>
    <div class="container">
      <v-app-bar elevation="0" style="background-color:transparent;">
        <div class="d-flex ml-auto">
          <nuxt-link
            to="login"
            id="login"
            class="animate__animated animate__flipInX"
            >ログイン</nuxt-link
          >
          <nuxt-link
            to="signUp"
            class="ml-5 mr-5  animate__animated animate__flipInX"
            >新規登録</nuxt-link
          >
        </div>
      </v-app-bar>
      <div class="main d-flex flex-column align-center justify-center">
        <h1 id="title" class="animate__animated animate__flipInX">
          WELCOME <br />YOUR TODOLIST
        </h1>
      </div>
    </div>
  </v-app>
</template>

<script>
import "animate.css";
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
* {
  overflow: hidden;
}
.container {
  min-width: 100%;
  height: 100%;
  background-image: url("~/assets/glass.jpg");
  background-position: center;
  background-size: cover;
  margin: 0;
}
.main {
  width: 100%;
  height: 100%;
  margin: 0;
}
#title {
  width: 800px;
  height: 200px;
  font-size: 60px;
  text-align: center;
  font-family: "Abril Fatface";
  color: #eee;
}
#title:hover {
  color: blueviolet;
}
a {
  margin: 0;
  font-family: "Abril Fatface" !important;
  font-size: 20px;
  color: white !important;
  font-weight: bold;
}
a:hover {
  color: blueviolet;
}
</style>
