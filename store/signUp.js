import firebase from "~/plugins/firebase";

export const state = () => ({
  errorMessage: "",
  mails: [],
  passwords: []
});

export const getters = {
  mails(state) {
    return state.mails;
  },
  passwords(state) {
    return state.passwords;
  }
};

export const actions = {
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
  error(state, error) {
    state.errorMessage = error;
  },
  blockRegister(state, key) {
    state.mails.push(key.mail);
    state.passwords.push(key.password);
    console.log(state.mails, state.passwords);
  }
};
