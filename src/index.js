import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc
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

 // adding docs
const addBookForm = document.querySelector(".add")
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault()

  addDoc(collectionRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  })
  .then(() => {
    addBookForm.reset()
  })
})

// deleting docs
const deleteBookForm = document.querySelector(".delete")
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const docRef = doc(db, "books", deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})