import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCuqoiB7I-u1JiA93snz4A-iI8a78CvKHk",
  authDomain: "upladingimages-a0c91.firebaseapp.com",
  projectId: "upladingimages-a0c91",
  storageBucket: "upladingimages-a0c91.appspot.com",
  messagingSenderId: "400230026288",
  appId: "1:400230026288:web:8ee58f0512bf53a13071f5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
