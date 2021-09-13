import firebase from "~/plugins/firebase";


export const actions = {
    register(context,key){
        console.log(key)
        firebase.auth().createUserWithEmailAndPassword(key.mail,key.password).then(res=>{
            key.router.push('/login')
        })
    }
}