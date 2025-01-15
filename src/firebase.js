// firebase.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  databaseURL:
    'https://app-chat-real-default-rtdb.asia-southeast1.firebasedatabase.app/',
  apiKey: 'AIzaSyBXqWk6Y4EtHaOm-aWLgeR2rWcdBB6zPxU',
  authDomain: 'app-chat-real-e2f55.firebaseapp.com',
  projectId: 'app-chat-real',
  storageBucket: 'app-chat-real.firebasestorage.app',
  messagingSenderId: '523159824293',
  appId: '1:523159824293:web:8ba79fa565a0cd3171ea4c',
  measurementId: 'G-VDD9TCBNK7',
};

if (!firebaseConfig) {
  console.error('Please set up your firebase config in .env file');
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, storage, RecaptchaVerifier, signInWithPhoneNumber };
