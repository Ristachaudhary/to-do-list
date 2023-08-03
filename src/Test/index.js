import { getFirestore, collection, doc, addDoc } from "firebase/firestore";
import { useState } from "react";

export default function Test (){
    const [inputVal, setInputVal] = useState('');
    const db =getFirestore('');
    const collectionName = 'testCollection';


   const handleClick = () =>{
   console.log('clicking..', inputVal)

   addDoc(collection(db, collectionName), {
    inputValueDocument : inputVal
   }).then(()=>{
    console.log('Document created');
   }).catch(err=>{
    console.log(err);
   })
   
   }
   
   
   
   const handleChange =(event) =>{
     const value = event.target.value;
     setInputVal(value);
   }
    return (
        <>
        <input type="text" onChange={handleChange}/><button onClick={handleClick}>Submit</button>
        </>
    )
}