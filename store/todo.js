import firebase from "~/plugins/firebase";

export const actions = {
  signout(context, key) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("signout");
        context.commit("signout", key);
      });
  }
};
export const mutations = {
  signout(state, key) {
    console.log(key.loginState);
    key.loginState = false;
    console.log(key.loginState);
    key.router.push("/login");
  }
};
