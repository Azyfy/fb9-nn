import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, getDocs, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where,
  orderBy, serverTimestamp,
  getDoc
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

// queries
const q = query(collectionRef, orderBy("createdAt"))
    // where("author", "==", "patrick rothfuss"),

// get collection data
// getDocs(collectionRef)
//   .then( snapshot => {
//     // console.log(snapshot.docs)

//     const books = []

//     snapshot.docs.forEach((doc) => {
//       books.push({ 
//         ...doc.data(), 
//         id: doc.id
//       })
//     })

//     console.log(books)
//   })
//   .catch( err => {
//     console.log(err.message)
//   })

// real time collection data
onSnapshot(q, snapshot => {
  const books = []

  snapshot.docs.forEach((doc) => {
    books.push({ 
      ...doc.data(), 
      id: doc.id
    })
  })

  console.log(books)
})

 // adding docs
const addBookForm = document.querySelector(".add")
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault()

  addDoc(collectionRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
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

// get single document
const docRef = doc(db, "books", "dKRSw5gy5uY86rWr7dQL")

// getDoc(docRef)
//   .then( doc => {
//     console.log(doc.data(), doc.id)
//   })

onSnapshot(docRef, doc => {
  console.log(doc.data(), doc.id)
})