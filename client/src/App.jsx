
import React from 'react'
import {BrowserRouter ,Route ,Routes} from 'react-router-dom'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import SignIn from './Pages/SignIn/SignIn'
import SignUp from './Pages/SignUp/SignUp'
import Profile from './Pages/Profile/Profile'
import NotFound from './Pages/NotFound/NotFound'
import Header from './Components/Header/Header'
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'
import CreateListing from './Pages/CreateListing/CreateListing'

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoute/>}>
           <Route path="/profile/" element={<Profile />} />
           <Route path="/createlisting" element={<CreateListing />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
