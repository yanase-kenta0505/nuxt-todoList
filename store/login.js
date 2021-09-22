import firebase from "~/plugins/firebase";

export const state = () => ({
  login: false
});

export const actions = {
  login(context, key) {
    firebase
      .auth()
      .signInWithEmailAndPassword(key.mail, key.password)
      .then(res => {
        context.commit("login", key.router);
      })
      .catch(() => {
        alert("新規登録をしてください。");
      });
  }
};

export const mutations = {
  login(state, router) {
    state.login = true;
    router.push("/todo");
  }
};

export const getters = {
  userUid(state) {
    return state.login;
  }
};
