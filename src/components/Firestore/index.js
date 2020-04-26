import firebase from 'firebase';
import "firebase/storage";

const config = {
    apiKey: "AIzaSyDxHpeYlUy0J7sSydE1XX6jjBo_B3zjbGY",
    authDomain: "firestoreboilerplate.firebaseapp.com",
    databaseURL: "https://firestoreboilerplate.firebaseio.com",
    projectId: "firestoreboilerplate",
    storageBucket: "firestoreboilerplate.appspot.com",
    messagingSenderId: "457425219732",
};
firebase.initializeApp(config);
const storage = firebase.storage();

export {
    storage, firebase as default
}