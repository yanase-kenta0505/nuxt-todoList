<template>
  <v-app>
    <v-card class="mx-auto mt-10" width="344px">
      <v-card-title>
        <h1 class="display-1">ログイン</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            label="メールアドレス"
            type="email"
            prepend-icon="mdi-email"
            v-model="mail"
            :rules="emailRules"
          />
          <v-text-field
            label="パスワード"
            :type="showPassWord ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            v-bind:append-icon="showPassWord ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassWord = !showPassWord"
            v-model="password"
          />
          <v-card-actions>
            <v-btn class="info" @click="login">送信</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
    <nuxt-link
      to="signUp"
      style="width:150px;margin:20px auto;text-align:center"
      >新規登録はこちら</nuxt-link
    >
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      showPassWord: false,
      mail: "",
      password: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        mail: this.mail,
        password: this.password,
        router: this.$router
      });
    }
  },
  created() {
    this.$store.dispatch("stateChange");
  }
};
</script>
