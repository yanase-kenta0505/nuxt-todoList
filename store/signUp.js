import firebase from "~/plugins/firebase";

export const state = () => ({
  errorMessage: ""
});

export const actions = {
  register(context, key) {
    console.log(key);
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
      state.errorMessage = error
  }
};
