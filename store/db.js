import firebase from "~/plugins/firebase";

const db = firebase.firestore()
const todoRef = db.collection('todo')

export const actions = {
addTodo(context, todoItem) {
    todoRef.add({
        todo:todoItem
    })
}
};
