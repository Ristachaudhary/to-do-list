import React, { useEffect, useRef, useState, } from "react";
import { getFirestore, collection, doc, addDoc, getDocs, setDoc, QuerySnapshot, deleteDoc, deleteField, updateDoc, query, where } from "firebase/firestore";

import "./style.css";

function HeroPage (props){
    const db =getFirestore('');
    const collectionName = 'testCollection';
    // const [inputValue, setInputValue] = useState(()=>{
    //     try{
    //         const arr =[];

    //        getDocs(collection(db, collectionName)).then((querySnapshot)=>{
    //             querySnapshot.forEach((doc)=>{
    //                 console.log(doc.id);
    //                 console.log(doc.data());
    //                 arr.push(doc.data().inputValueDocument);
    //             })
    //         });
    //         console.log(arr);
    //         return arr;
    //         // return JSON.parse(localStorage.getItem('inputValue')|| '[]');

    //     }catch(err){
    //         console.log(err);
    //         return[];
    //     }
    // });
   const [inputValue, setInputValue] = useState([]);
   useEffect(()=>{
    (async () =>{
        const arr =[];
        const q = query(collection(db, collectionName), where('userId', "==", props.userUid
        ))
        // const querySnapshot = await getDocs(collection(db, collectionName));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc)=>{
            // arr.push(doc.data().inputValueDocument);
            arr.push({
                id : doc.id,
                toDo : doc.data().inputValueDocument,
                isChecked : doc.data().isChecked
            })
        })
        setInputValue(arr)
    })();
   }, [])
   
    // const [inputValue, setInputValue] = useState('');
    // Throws an error. inputValue.map is not a function

    // const [inputValue, setInputValue] = useState([]);
    // const[todos, setTodos] = useState([]);
    // useEffect(()=>{
    //     db.collection(db, collectionName).onSnapshot(snapshot =>{
    //         setTodos(snapshot.docs.map(doc=>({id:doc.id, todo:doc.data().todo})))
    //     }
    //     )
    // })


    const myRef = useRef();

    const handleclick = () => {
      const value = myRef.current.value;
    //   console.log({value})


    setInputValue([...inputValue, value]);
     addDoc(collection(db, collectionName), {
        inputValueDocument : value,
        userId : props.userUid
        
       }).then(()=>{
        console.log('Document created');
       }).catch(err=>{
        console.log(err);
       })

    //   localStorage.setItem('inputValue', JSON.stringify([...inputValue, value]));
      myRef.current.value = " ";
    }

    const handleDel = ( index) =>{
        const docId = inputValue[index].id;
        console.log("del", index)
    const newArr = inputValue.filter((__, i)=> index !== i);
    setInputValue(newArr);
     deleteDoc(doc(db, collectionName, docId));
    // deleteDoc(cityRef, {
    //     inputValueDocument: deleteField()
    // });

    // localStorage.setItem('inputValue', newArr);

    }

     const checkbox = (e,index) =>{
        const check = e.target
        const docId = inputValue[index].id;
        const todo = inputValue[index].toDo;
        if(check.checked){
            setDoc(doc(db, collectionName, docId),{
             isChecked : true,
             inputValueDocument : todo
            });
        }else{
            setDoc(doc(db, collectionName, docId),{
                isChecked : false,
                inputValueDocument : todo

            })
        }
         
       
     }
    

    return(
        <div>
            <div>
                <input type="text" className="input" ref={myRef}></input>
                <button className="btn" onClick={handleclick}>Submit</button>
            </div>
           { inputValue.map((inputVal, index)=>{
                 return(
                    <div className="result_btn">
     <input type="checkbox" onClick={(e)=>checkbox(e, index)} checked={inputVal.isChecked}/>
                <div>{inputVal.toDo}</div>
                <button onClick={()=>handleDel(index)}>Del</button>
            </div>
                 )
           })}
        </div>
    )
}

export default HeroPage;