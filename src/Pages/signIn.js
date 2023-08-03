import React, {useState} from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();


const SignIn = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser= () =>{
        signInWithEmailAndPassword(auth, email, password).then((value)=>{alert('sucessfully signed in')}
        ).catch((err)=>console.log(err));
    }

    return (
     <div className='signIn'>
        <h1>Sign In Page</h1>
        <label>Email </label>
        <input type='email' onChange={e=>setEmail(e.target.value)} value={email} placeholder='enter email here' required/>
        <label>Password </label>
        <input type='password' onChange={e=>setPassword(e.target.value)} value={password} placeholder='enter email here' required/>
        <button onClick={loginUser}>Create Account</button>

     </div>
    )
}

export default SignIn;