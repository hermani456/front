import { initializeApp } from 'firebase/app'

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_KEY,

	authDomain: 'project-26c1f.firebaseapp.com',

	projectId: 'project-26c1f',

	storageBucket: 'project-26c1f.appspot.com',

	messagingSenderId: '1072155406995',

	appId: '1:1072155406995:web:33d9a73e03e10e65659366',
}

const app = initializeApp(firebaseConfig)
