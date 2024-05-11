import React, { useState } from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import {signInStart,
  signInSuccess,
  signInFailure,} from '../../redux/user/userSlice'

const SignIn = () => {
  const navigate = useNavigate()
  const [formData , setFormData]=useState({});
  const {error ,loading}=useSelector((state)=>state.user)
  const dispatch=useDispatch()


  const handleChange=(e)=>{
      setFormData({...formData ,[e.target.id]: e.target.value})
  }

  const handleSubmin=async(e)=>{
    e.preventDefault()
    
    try {
      dispatch(signInStart())
      const res=await fetch('/api/auth/signin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data=await res.json()
      if(data.success === false){
        dispatch(signInFailure(data.message))
        return;
      }
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
    
  }

  console.log(formData)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-7'>Sign In</h1>
      <form onSubmit={handleSubmin} className='flex flex-col gap-5'>
        
        <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' :'Sign in'}
          </button>
      </form>
      <div className='flex gap-3 items-center mt-5'>
        <p>don't Have an account?</p>
        <Link to={'/signup'}><span className='text-blue-700'>Sign up</span></Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignIn
