import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/analytics'
import 'firebase/auth'

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBnNhwGqCPhR3kMeo3VJEW2FLhU3b7YA68",
    authDomain: "loginpage-48f53.firebaseapp.com",
    projectId: "loginpage-48f53",
    storageBucket: "loginpage-48f53.appspot.com",
    messagingSenderId: "899633821860",
    appId: "1:899633821860:web:24c1c03386931dcf97ce31",
    measurementId: "G-XMRMTCJW7L"
};
// Initialize Firebase

export const createUser = async(user, additionalData) => {
  if(!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = userRef.get();

  if(!snapshot.exists){
    const {email, displayName} = user;
    const createAt = new Date();
    try{
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      })
    }catch(error){
      console.log(error)
    }
  }
  return userRef;
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider)


export default firebase;