import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDxIyxkMgoBNeVElU29GfFXuSkq3jl98Tc",
    authDomain: "vistaplanner-4d560.firebaseapp.com",
    projectId: "vistaplanner-4d560",
    storageBucket: "vistaplanner-4d560.firebasestorage.app",
    messagingSenderId: "984710204991",
    appId: "1:984710204991:web:84823517db75df9779b28a",
    measurementId: "G-F4940KHGYL"
  };

const fireApp = initializeApp(firebaseConfig)

export const db = getFirestore(fireApp);