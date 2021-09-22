import firebase from "~/plugins/firebase";

export const state = () => ({
  login: false
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
  }
};

export const getters = {
  userUid(state) {
    return state.login;
  }
};
