
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Components/Login/Login';
import SignUp from './Components/Signup/Signup';
import Create from './Components/Add/Add';
import ViewPost from './Pages/ViewPost/ViewPost';
import NotFound from './Pages/NotFound/NotFound';
import ProtectedRoute from './Components/ProtectedRoute'; // Import your ProtectedRoute
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [search, setSearch] = useState('');

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home search={search} setSearch={setSearch} />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/create'
          element={<ProtectedRoute element={<Create />} />} // Use ProtectedRoute here
        />
        <Route path='/view/:id' element={<ViewPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
