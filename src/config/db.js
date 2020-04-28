import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAZ5RVA-zXlsk92on6GTFASaRf4KEGEyDo",
    authDomain: "hutech-education.firebaseapp.com",
    databaseURL: "https://hutech-education.firebaseio.com",
    projectId: "hutech-education",
    storageBucket: "hutech-education.appspot.com",
    messagingSenderId: "501319299038",
    appId: "1:501319299038:web:bd745da80ec5bf68c7f74f",
    measurementId: "G-Q92Y4KVQ9D"
};

// let app
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const db = firebase.database()