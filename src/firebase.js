import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyClBoTG42xaBf3Lt5swkJOKapIcJemfimM",
  authDomain: "pokematch-4bb6e.firebaseapp.com",
  databaseURL: "https://pokematch-4bb6e.firebaseio.com",
  projectId: "pokematch-4bb6e",
  storageBucket: "",
  messagingSenderId: "768468364816",
  appId: "1:768468364816:web:0423a0ce264a75c6"
};

firebase.initializeApp(firebaseConfig);

export default firebase;