<template>
  <v-app>
    <v-card class="mx-auto mt-10" width="344px">
      <v-card-title>
        <h1 class="display-1">新規登録</h1>
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
            <v-btn class="info" @click="register">登録</v-btn>
          </v-card-actions>
          <p style="color:red">{{ errorMessage }}</p>
        </v-form>
      </v-card-text>
    </v-card>
    <nuxt-link to="login" style="width:200px;margin:20px auto"
      >ログインページはこちら</nuxt-link
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

  computed: {
    errorMessage() {
      return this.$store.state.errorMessage;
    },
    usedMail() {
      return this.$store.getters.mails.includes(this.mail);
    },
    usedPassword() {
      return this.$store.getters.passwords.includes(this.password);
    }
  },
  methods: {
    register() {
      // console.log(this.usedMail, this.usedPassword);
      // if (this.usedMail === true || this.usedPassword === true) {
      //   console.log(
      //     "このメールアドレス、パスワードは両方もしくは片方がすでに使われています"
      //   );
      //   this.mail = "";
      //   this.password = "";
      //   return;
      // } else {
        this.$store.dispatch("register", {
          mail: this.mail,
          password: this.password,
          router: this.$router
        });
      // }
    }
  }
};
</script>
