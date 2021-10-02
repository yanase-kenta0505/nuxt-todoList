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
  },
  update(context, updateItem) {
    todoRef.doc(updateItem.id).update({
      done: !updateItem.done
    });
  },
  edit(context, editItem) {
    // console.log(editItem.id);
    // console.log(editItem.todoText);
    // console.log(editItem.dedline);
    todoRef.doc(editItem.id).update({
      todo: editItem.todoText,
      date: editItem.dedline
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
      state.todos.push(todo);
    });

    stateItem.ids.forEach(id => {
      state.ids.push(id);
    });
  }
};
