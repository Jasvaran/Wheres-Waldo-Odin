import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyC6tAMe8QqToKja1Ja0rxupzkb9WWoZ4kM",
    authDomain: "wheres-waldo-odin.firebaseapp.com",
    projectId: "wheres-waldo-odin",
    storageBucket: "wheres-waldo-odin.appspot.com",
    messagingSenderId: "152982877344",
    appId: "1:152982877344:web:9adc320982bf1da17305c5"
  };

  export const app = initializeApp(firebaseConfig)