import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAiiSFKD642vgsFxssOLz6zW_YGm0K04wY",
    authDomain: "fir-tutorial-crud-ee266.firebaseapp.com",
    projectId: "fir-tutorial-crud-ee266",
    storageBucket: "fir-tutorial-crud-ee266.appspot.com",
    messagingSenderId: "358724467177",
    appId: "1:358724467177:web:fae5be766166c9304cb378",
    measurementId: "G-Z9Y7VH7VW0"
  };


const app = initializeApp(firebaseConfig);
 export const storage = getStorage(app);
 export const db = getFirestore(app);
