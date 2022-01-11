import firebase from "~/plugins/firebase";
import _, { bindAll } from "lodash";

const db = firebase.firestore();
const todoRef = db.collection("todo");

export const state = () => ({
  todos: []
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
    todoRef
      .doc(selectItem.uid)
      .collection("todo")
      .add({
        todo: selectItem.todoItem,
        date: selectItem.date,
        done: selectItem.done
      });
  },
  snapshot(context, uid) {
    todoRef
      .doc(uid)
      .collection("todo")
      .onSnapshot(snapshot => {
        let todos = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          data.id = doc.id;
          todos.push(data);
        });
        if (
          JSON.parse(localStorage.getItem(uid)) === null ||
          JSON.parse(localStorage.getItem(uid)).length === 0
        ) {
          // console.log("foo");
          context.commit("getItem", todos);
        } else {
          // console.log("hoo");
          const localData = JSON.parse(localStorage.getItem(uid));
          const filteredTodos = localData.filter(x =>
            todos.map(t => t.todo).includes(x.todo)
          );
          const unmatchedTodo = todos.filter(
            x => !localData.map(t => t.todo).includes(x.todo)
          );
          if (localData.length > todos.length) {
            context.commit("replaceTodos", filteredTodos);
          } else if (localData.length === todos.length) {
            const b = [];
            for (let i = 0; i < localData.length; i++) {
              let a = _.find(todos, function(todo) {
                return todo.id === localData[i].id;
              });
              b.push(a);
            }
            // console.log(b);
            context.commit("replaceTodos", b);
          } else {
            //  console.log(unmatchedTodo)
            localData.push(...unmatchedTodo);
            context.commit("replaceTodos", localData);
          }
        }
      });
  },
  update(context, updateItem) {
    todoRef
      .doc(updateItem.uid)
      .collection("todo")
      .doc(updateItem.id)
      .update({
        done: !updateItem.done
      });
  },
  edit(context, editItem) {
    todoRef
      .doc(editItem.uid)
      .collection("todo")
      .doc(editItem.id)
      .update({
        todo: editItem.todoText,
        date: editItem.dedline
      });
  },
  deleteItem(context, deleteItem) {
    todoRef
      .doc(deleteItem.uid)
      .collection("todo")
      .doc(deleteItem.id)
      .delete();
  }
};

export const mutations = {
  getItem(state, todos) {
    state.todos = todos;
  },
  replaceTodos(state, todos) {
    state.todos = todos;
  }
};
