import './App.css';
import HeroPage from './HeroPage';
import './Components/firebase';
import Test from './Test';
import SignUp from './Pages/signup';
import SignIn from './Pages/signIn';
import React, {useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth';

const auth = getAuth();
function App() {
  const[user, setUser] = useState(null);

  useEffect (()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user){
        setUser(user);
        console.log(user);
      }else{
        console.log('You are logged out');
        setUser(null);
      }
    })
  }, [])
  

    if (user === null){
      return(
        <div className="App">


          {/* <Test/> */}
          <SignUp/>
          <SignIn/>
    </div>
      );
    
    }
    return(
      <div className='App'>
      <h1>Hello {user.email}</h1>
      <button onClick={()=>signOut(auth)}>Logout</button>
              <HeroPage userUid={user.uid}/>

      </div>
    )
      
    
  
}

export default App;
