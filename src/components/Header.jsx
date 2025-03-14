import { signOut } from 'firebase/auth'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../utils/firebase'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import {useEffect} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { LOGO } from '../utils/constants'


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(stor => stor.user);
  
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(removeUser());
    }).catch((error) => { 
      navigate("/error");
    });
  };

  useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, (user) => {
        if(user){
            const {uid, email, displayName, photoURL} = user;
            dispatch(addUser({uid: uid, email: email, displayName: displayName,
            photoURL: photoURL
            }));
            navigate("/browse");
        }
        else{
            dispatch(removeUser());
            navigate("/");
        }
    });
    //unsubscribe from the listener when the component is unmounted
    return () => unsubscribe();
},[]);


  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className='w-44' src={LOGO}
      alt="logo" />
      {user?.uid && (
        <div className='flex p-2'>
        <img className='w-10 h-10' src={user?.photoURL} alt="" />
        <button onClick={handleSignOut} className='flex font-bold text-white cursor-pointer'>Sign Out</button>
      </div>
      )}
    </div>
  )
}

export default Header
