import firebase from "~/plugins/firebase";

export const actions = {
    login(context,key){
        firebase.auth().signInWithEmailAndPassword(key.mail,key.password).then(res=>{
            key.router.push('/')
        }).catch(()=>{
            alert('新規登録をしてください。')
        })
    }
}