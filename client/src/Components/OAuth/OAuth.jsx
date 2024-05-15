import React from 'react'
import {GoogleAuthProvider, signInWithPopup ,getAuth} from 'firebase/auth'
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {signInSuccess} from '../../redux/user/userSlice'
import { app } from '../../firebase'

const OAuth = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const auth=getAuth(app)
    
    const handleGoogleClick=async()=>{
        const provider= new GoogleAuthProvider()
        provider.setCustomParameters({prompt:'select_account',})
        try {
            const resultFromGoogle = await signInWithPopup(auth ,provider)
            const res=await fetch('/api/auth/google' ,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    name:resultFromGoogle.user.displayName,
                    email:resultFromGoogle.user.email,
                    photo:resultFromGoogle.user.photoURL,
                })
            })

            const data=await res.json()
            if(res.ok){
               dispatch(signInSuccess(data));
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <button onClick={handleGoogleClick} type='button' className='bg-sky-600 text-white p-3 rounded-lg hover:opacity-95 '>
      Continue With Google
    </button>
  )
}

export default OAuth
