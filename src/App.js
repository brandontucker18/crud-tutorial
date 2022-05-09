
import { useState, useEffect } from 'react';
import './App.css';
import { db, storage } from './firebase-config';
import { ref, uploadBytes } from 'firebase/storage';
import { collection, getDocs, addDoc, updateDoc, deleteDoc,doc } from 'firebase/firestore';
import {v4} from 'uuid';

function App() {

  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newImage, setNewImage] = useState(null);
  const [users, setUsers] = useState([]);
  const usersColectionRef = collection(db, "users");




  const uploadImage = () => {
    if (newImage == null) return;
    const imageRef = ref(storage, `images/${newImage.name + v4()}`);
    uploadBytes(imageRef, newImage).then(() => {
      alert("Image Upload");
    })
  }

  const createUser = async () => {
    await addDoc(usersColectionRef, {name: newName, age: Number(newAge), image: newImage});
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id)
    const newFields= {age: age + 1}
    await updateDoc(userDoc, newFields)
  }

  const decreaseUser = async (id, age) => {
    const userDoc = doc(db, "users", id)
    const newFields= {age: age - 1}
    await updateDoc(userDoc, newFields)
  }

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc)
  }

  useEffect(() => {
    const  getUsers = async () => {
      const data = await getDocs(usersColectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getUsers();
  }, []);

  return (
    <div className="App">
      <input type="file" onchange={(event) => {setNewImage(event.target.files[0])}}></input>
      <input placeholder="Name..." onChange={(event) => { setNewName(event.target.value); }}  />
      <input type="number" placeholder="Age..." onChange={(event) => { setNewAge(event.target.value); }} />
      <button onClick={createUser}>Create User</button>
      <button onclick={uploadImage}> upload image</button>
      {users.map((user) => {
         return (
          <div>
             <h1>Name: {user.name}</h1> 
             <h1>Age: {user.age}</h1>
             <h1> image: {user.image}{user.newImage}</h1>  
             <button onClick={() => {updateUser(user.id, user.age)}}>Increase Age</button>
             <button onClick={() => {decreaseUser(user.id, user.age)}}>Decrease Age</button>
             <button onClick={() => {deleteUser(user.id)}}>Delete Your History</button>
          </div>
         ) 
         })}
    </div>
  );
}

export default App;