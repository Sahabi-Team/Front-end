import React from 'react'

import { Routes, Route } from 'react-router-dom';

import Edit from "./pages/EditProfile";


function App() {
  return (
    <>
      <Routes>

    
      <Route path="/edit/*" element={<Edit />} /> 
 
    </Routes>
    </>
  )
}

export default App