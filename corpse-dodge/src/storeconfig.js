import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJK-1WxX3tDvmI1OBIaCIA-Oa54oamVEI",
  authDomain: "corpse-dodge.firebaseapp.com",
  projectId: "corpse-dodge",
  storageBucket: "corpse-dodge.appspot.com",
  messagingSenderId: "113918464287",
  appId: "1:113918464287:web:2d5466f6615002aa13a02a",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const auth = getAuth();
signInAnonymously(auth)
  .then(() => {
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });

const fetchScores = async () => {
  const querySnapshot = await getDocs(collection(db, "Scores"));
  const newScores = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return newScores.sort((a, b) => b.score - a.score).slice(0, 10);
};

export const scores = await fetchScores();