
import React from 'react'
import {BrowserRouter ,Route ,Routes} from 'react-router-dom'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import SignIn from './Pages/SignIn/SignIn'
import SignUp from './Pages/SignUp/SignUp'
import Profile from './Pages/Profile/Profile'
import NotFound from './Pages/NotFound/NotFound'
import Header from './Components/Header/Header'

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
