import * as firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: "AIzaSyBncMV-w4_-28KuptiO9jsk5IyqqUUOhss",
	authDomain: "ecat-23af7.firebaseapp.com",
	databaseURL: "https://ecat-23af7.firebaseio.com",
	projectId: "ecat-23af7",
	storageBucket: "ecat-23af7.appspot.com",
	messagingSenderId: "1055806833602",
	appId: "1:1055806833602:web:50664b2869227ba4528c5b"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export {
	auth,
}