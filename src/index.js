import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, getDocs
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyABIsTCW2N2KR9KFsKRL8gundgAxjwXHrY",
    authDomain: "fir-9-dojo-nn.firebaseapp.com",
    projectId: "fir-9-dojo-nn",
    storageBucket: "fir-9-dojo-nn.appspot.com",
    messagingSenderId: "11294072029",
    appId: "1:11294072029:web:b9a82e3dc5515d2ef9cf34"
  };

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore()

// collection ref
const collectionRef = collection(db, "books")

// get collection data
getDocs(collectionRef)
  .then( snapshot => {
    // console.log(snapshot.docs)

    const books = []

    snapshot.docs.forEach((doc) => {
      books.push({ 
        ...doc.data(), 
        id: doc.id
      })
    })

    console.log(books)
  })
  .catch( err => {
    console.log(err.message)
  })