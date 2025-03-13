import { signOut } from 'firebase/auth'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../utils/firebase'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { removeUser } from '../utils/userSlice'

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(stor => stor.user);
  const dispatch = useDispatch();
  
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(removeUser());
      navigate("/");
    }).catch((error) => { 
      navigate("/error");
    });
  }
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className='w-44' src="https://imgs.search.brave.com/pB7rmF0nJIRrC9TeIkUEjCoOrOx8oh-ZcEy8Qci1QgA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODBiNTdmY2Q5OTk2/ZTI0YmM0M2M1Mjku/cG5n" 
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
