import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiYb3N4PbVdhTHPCo3XcEyl_wmvZ5PB-Q",
  authDomain: "olx-react-55349.firebaseapp.com",
  projectId: "olx-react-55349",
  storageBucket: "olx-react-55349.appspot.com",
  messagingSenderId: "776546008575",
  appId: "1:776546008575:web:7166d43a62ef7e55f1bbca",
  measurementId: "G-EBM1HTWQF7"
};


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { firebaseApp, auth, db };