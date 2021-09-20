<template>
  <div>
    <h1>hello</h1>
    <v-btn @click="signUpPage">signUp page</v-btn>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
export default {
  methods:{
    signUpPage(){
      this.$router.push('/login')
    }
  }
};
</script>
