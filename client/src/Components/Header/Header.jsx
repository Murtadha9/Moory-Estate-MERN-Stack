import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import {Link, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Logo from '../Logo/Logo';

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);


  return (
    <header className='shadow-md bg-gradient-to-r from-slate-300 to-sky-600'>
      <div className='flex items-center justify-between max-w-6xl mx-auto p-3'>
      <Link to={'/'}>
      <div className='flex items-center gap-10'>
        <div >
        <Logo/>
        </div>
      <h1 className='flex flex-wrap items-center  font-bold sm:text-xl'>
        <span className='text-sky-600 font-extrabold'>Moory</span>
        <span className=''>Estate</span>
      </h1>
      </div>
      </Link>

      <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
        <input onChange={(e)=>setSearchTerm(e.target.value)} value={searchTerm}
        type="text" placeholder='search.....' className='bg-transparent focus:outline-none w-24 sm:w-64' />
        <button>
          <FaSearch className='text-slate-500 cursor-pointer'/>
        </button>
      </form>
      <ul className='flex gap-4'>
        <Link to={'/'}>
            <li className='hidden sm:inline font-bold text-slate-700 hover:underline '>Home</li>
        </Link>
        <Link to={'/about'}>
            <li className='hidden sm:inline font-bold text-slate-700 hover:underline '>About</li>
        </Link>
        
        {currentUser ?(
          <Link to={'/profile'}>
          <img
          className='rounded-full h-7 w-7 object-cover'
          src={currentUser.avatar}
          alt='profile'
        />
          </Link>
        ):(
          <Link to={'/signin'}>
          <li className='hidden sm:inline font-bold text-slate-700 hover:underline '>Sign In</li>
      </Link>
        )}
       
      </ul>
      </div>
    </header>
  )
}

export default Header
