import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyBR6hlnQtKdaMtakA4G5EGDtM6jxvm0_Tg",
    authDomain: "coffee-shop-mobile.firebaseapp.com",
    databaseURL: "https://coffee-shop-mobile.firebaseio.com",
    storageBucket: "coffee-shop-mobile.appspot.com",
    messagingSenderId: "61080884317"
  };
export const firebaseApp = firebase.initializeApp(config);

export const coffee = firebase.database().ref("drinks/coffee");
export const tea = firebase.database().ref("drinks/tea");
export const localFavorites = firebase.database().ref("drinks/local-favorites");
export const smoothies = firebase.database().ref("drinks/smoothies");
export const juice = firebase.database().ref("drinks/fresh-pressed-juice");

export const locations = firebase.database().ref("locations");
