import firebase from "~/plugins/firebase";

export const state = () => ({
  uid: ""
});

export const actions = {
  login(context, key) {
    firebase
      .auth()
      .signInWithEmailAndPassword(key.mail, key.password)
      .then(res => {
        console.log(res);
        console.log(res.user.uid);
        context.commit("setUid", res.user.uid);
        key.router.push("/todo");
      })
      .catch(() => {
        alert("新規登録をしてください。");
      });
  }
};

export const mutations = {
  setUid(state, uid) {
    state.uid = uid;
  }
};

export const getters = {
  userUid(state) {
    return state.uid;
  }
};
