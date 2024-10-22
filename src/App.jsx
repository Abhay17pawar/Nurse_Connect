import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login'
import Signup from './pages/Signup'
import HomePage from './pages/Home'

function App (){
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomePage/>}/>
        </Routes>
    </BrowserRouter>
  );
};


export default App
