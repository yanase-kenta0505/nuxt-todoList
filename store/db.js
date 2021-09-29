import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const todoRef = db.collection("todo");

export const state = () => ({
  todos: [],
  ids: []
});

export const getters = {
  todos(state) {
    return state.todos;
  },
  ids(state) {
    return state.ids;
  }
};

export const actions = {
  addTodo(context, selectItem) {
    todoRef.add({
      todo: selectItem.todoItem,
      date: selectItem.date,
      done: selectItem.done
    });
  },
  snapshot(context) {
    todoRef.onSnapshot(snapshot => {
      let todos = [];
      let ids = [];
      snapshot.forEach(doc => {
        // console.log(doc.id);
        ids.push(doc.id);
        todos.push(doc.data());
      });
      //   console.log(todo)
      context.commit("getItem", {
        todos: todos,
        ids: ids
      });
    });

    // 追加や削除があったときにすべてのデータを取得する場合
    // .onSnapshot(snapshot => {
    // if () {
    // snapshot.forEach(doc => {
    // ;
    // });
    // context.commit(, );
    // } else {
    // // 追加や変更があったときに変更差分のデータのみ取得
    // snapshot.docChanges().forEach(change => {
    // if (change.doc.data().timestamp === null) {
    // return;
    // } else {
    // context.commit(, );
    // }
    // });
    // }
    // });
  },
  update(context, updateItem) {
    // console.log(updateItem);
    // console.log(todoRef.doc(updateItem.id));
    // console.log(updateItem.done);
    todoRef.doc(updateItem.id).update({
      done: !updateItem.done
    });
  },
  deleteItem(context, id) {
    todoRef.doc(id).delete();
  }
};

export const mutations = {
  getItem(state, stateItem) {
    state.todos = [];
    state.ids = [];
    stateItem.todos.forEach(todo => {
      // console.log(todo);
      state.todos.push(todo);
    });

    stateItem.ids.forEach(id => {
      // console.log(id);
      state.ids.push(id);
    });
    // console.log(state.todos);
    // console.log(state.ids);
  }
};
