import firebase from "~/plugins/firebase";

export const state = () => ({
  login: false,
  errorMessage: "",
  mails: [],
  passwords: []
});

export const actions = {
  stateChange(context) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        context.commit("login");
      } else {
        context.commit("signOut");
      }
    });
  },
  login(context, key) {
    firebase
      .auth()
      .signInWithEmailAndPassword(key.mail, key.password)
      .then(res => {
        key.router.push("/todo");
      })
      .catch(() => {
        alert("新規登録をしてください。");
      });
  },
  signout(context, key) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("signout");
        context.commit("signout", key);
      });
  },
  register(context, key) {
    console.log(key);
    context.commit("blockRegister", key);
    firebase
      .auth()
      .createUserWithEmailAndPassword(key.mail, key.password)
      .then(res => {
        key.router.push("/login");
      })
      .catch(error => {
        console.log(error);
        context.commit("error", error);
      });
  }
};

export const mutations = {
  login(state, router) {
    console.log(state.login);
    state.login = true;
  },
  signOut(state) {
    console.log(state.login);
    state.login = false;
  },
  signout(state, key) {
    console.log(key.loginState);
    key.loginState = false;
    console.log(key.loginState);
    key.router.push("/login");
  },
  error(state, error) {
    state.errorMessage = error;
  },
  blockRegister(state, key) {
    state.mails.push(key.mail);
    state.passwords.push(key.password);
    console.log(state.mails, state.passwords);
  }
};

export const getters = {
  userUid(state) {
    return state.login;
  },
  mails(state) {
    return state.mails;
  },
  passwords(state) {
    return state.passwords;
  }
};
