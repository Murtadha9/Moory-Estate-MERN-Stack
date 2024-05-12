import React, { useRef, useState } from 'react'
import {useSelector ,useDispatch} from 'react-redux'
import {updateUserFailure,
        updateUserSuccess,
        updateUserStart,} from '../../redux/user/userSlice'

const Profile = () => {

  const dispatch=useDispatch()
  const {currentUser ,loading ,error}=useSelector((state)=>state.user)
  const fileRef=useRef()
  const [imageFile ,setImageFile]=useState(null)
  const [imageFileURL,setImageFileURL]=useState(null)
  const [formData,setFormData]=useState({})
  const [updateSuccess ,setUpdateSuccess]=useState(false)


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); 
      setImageFile(file);
      setImageFileURL(imageUrl);
  
      // Update formData.photoURL with the imageUrl
      setFormData({ ...formData, avatar: imageUrl });
    }
  };

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()

    try {
      dispatch(updateUserStart())
      const res=await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data=await res.json()
      if(res.success === false){
        dispatch(updateUserFailure(data.message))
      }else{
        dispatch(updateUserSuccess(data))
        setUpdateSuccess(true)
      }
      
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
   
  }


  console.log(formData)

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-bold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit}  className='flex flex-col gap-5 '>
        <input type="file" ref={fileRef} accept='image/*' hidden onChange={handleImageChange}/>
        <img src={imageFileURL || currentUser.avatar} alt={currentUser.username} onClick={()=>fileRef.current.click()} className='rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2' />
        <input type="text" defaultValue={currentUser.username} id='username' className='border p-3 rounded-lg' onChange={handleChange} />
        <input type="email" defaultValue={currentUser.email} id='email' className='border p-3 rounded-lg'  onChange={handleChange}/>
        <input type="password" placeholder='password' id='password' className='border p-3 rounded-lg' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80'>
          {loading? 'Loading...' :'Update Profile'}
  
        </button>
      </form>
      <div className='flex items-center justify-between mt-5'>
        <span className='text-red-700 cursor-pointer font-bold'>Delete an Account</span>
        <span className='text-red-700 cursor-pointer font-bold'>Sign Out</span>
      </div>
      <p className='text-red-700 mt-5'>{error && {error}}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
    </div>
  )
}

export default Profile
