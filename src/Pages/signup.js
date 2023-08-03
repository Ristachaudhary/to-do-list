import React, { useState } from "react";
import {getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
// import app from '../Components/firebase';

const auth = getAuth();
const googleProvider =new GoogleAuthProvider();
const SignUp = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const creatUser = () =>{
        createUserWithEmailAndPassword(auth, email, password);
    }
    const signUpWithGoogle = () =>{
        signInWithPopup(auth, googleProvider)
    }
    return (
        <div className="signUp_Page">
            <h1>Sign Un Page</h1>

            <label>Email</label>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" required placeholder="Enter your email"/>
            <label>Password</label>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" required placeholder="Enter your email"/>
            <button onClick={creatUser}>Create Account</button>
            <button onClick={signUpWithGoogle}>Sign In with google</button>
        </div>
    )
}


export default SignUp;