import React, { useState, useRef} from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const[isSignInForm, setIsSignInForm] = useState(true);
  const[errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  
  const handleButtonClick = () => {
    //validate the form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if(message) return;
    //create a new user or sign in the user
    if(!isSignInForm){
      //sign up
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/97499344?v=4"
          })
          .then(() => {
            const {uid, email, displayName, photoURL} = user //auth.currentUser;
            dispatch(addUser({uid: uid, email: email, displayName: displayName,
            photoURL: photoURL
            }));
            navigate('/browse');
            // ...
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode+"-"+ errorMessage);
          // ..
      });
    }
    else{
      //sign in
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate('/browse');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+"-"+ errorMessage);
      });
    }
  }

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  }

  return (
    <div>
      <Header/>
      <div className="absolute">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/42a0bce6-fc59-4c1c-b335-7196a59ae9ab/web/IN-en-20250303-TRIFECTA-perspective_d5f81427-d6cf-412d-8e86-2315671b9be1_large.jpg" alt="logo" />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="w-3/12 absolute p-12 bg-black/80 my-36 mx-auto right-0 left-0 text-white rounded-2xl">
        <h1 className="text-3xl font-bold py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        
        {!isSignInForm && (<input 
          ref={name}
          type="text" 
          placeholder="Full Name" 
          className="p-2 my-2 w-full bg-gray-700 text-white border border-gray-500"
        />)}

        <input 
          ref={email}
          type="text" 
          placeholder="Email Address" 
          className="p-2 my-2 w-full bg-gray-700 text-white border border-gray-500"
        />
        
        <input 
          ref={password}
          type="password" 
          placeholder="Password" 
          className="p-2 my-2 w-full bg-gray-700 text-white border border-gray-500"
        />
        <p className='text-red-500 text-lg py-2 font-semibold'>{errorMessage}</p>
        <button className="p-2 my-2 bg-red-700 hover:bg-red-800 w-full rounded-lg" onClick={handleButtonClick} >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className='py-4 text-sm cursor-pointer' onClick={toggleSignInForm}> {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}</p>
      </form>
    </div>
  )
}

export default Login
