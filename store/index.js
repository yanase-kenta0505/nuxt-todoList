import firebase from "~/plugins/firebase";

export const state = () => ({
  login: false,
  errorMessage: "",
  uid: ""
  // mails: [],
  // passwords: []
});

export const actions = {
  stateChange(context) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        context.commit("login", user.uid);
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
        key.router.push({ name: "users-id", params: { id: this.state.uid } });
      })
      .catch(() => {
        alert("新規登録をしてください。");
      });
  },
  signOut(context, router) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("signOut");
        context.commit("signOut");
        router.push("/login");
      });
  },
  register(context, key) {
    console.log(key);
    // context.commit("blockRegister", key);
    firebase
      .auth()
      .createUserWithEmailAndPassword(key.mail, key.password)
      .then(res => {
        key.router.push("../users/login");
      })
      .catch(error => {
        console.log(error);
        context.commit("error", error);
      });
  }
};

export const mutations = {
  login(state, uid) {
    console.log(state.login);
    state.login = true;
    state.uid = uid;
  },
  signOut(state) {
    state.login = false;
  },
  error(state, error) {
    state.errorMessage = error;
  }
  // blockRegister(state, key) {
  //   state.mails.push(key.mail);
  //   state.passwords.push(key.password);
  //   console.log(state.mails, state.passwords);
  // }
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
