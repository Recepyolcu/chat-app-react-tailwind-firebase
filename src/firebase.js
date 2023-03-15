import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAkpci7wDBr1r6IP5knx6LdVLO1zJqm1b4",
  authDomain: "chat-9b1d7.firebaseapp.com",
  projectId: "chat-9b1d7",
  storageBucket: "chat-9b1d7.appspot.com",
  messagingSenderId: "260779906864",
  appId: "1:260779906864:web:74170716fe09fafabe9af5"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();