import React from 'react'
import Header from './Layout/Header'
import Footer from './Layout/Footer'
import Quanlysach from './Page/Quanlysach';
import  { createContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Chitiet from './Page/Chitiet';
import Quanlyloai from './Page/Quanlyloai';
import Quanlydocgia from './Page/Quanlydocgia';
import Chitietdocgia from './Page/Chitietdocgia';
import Quanlymuontra from './Page/Quanlymuontra';
const App = () => {
  return (
    <div>
      <Header></Header>
     
      <Routes>
      
      <Route path="/" element={<Quanlysach />}></Route>
      <Route path = "/detail" element={<Chitiet/>}>
        <Route path=":id" element={<Chitiet />}></Route>
      </Route>
      <Route path="/category" element={<Quanlyloai />}></Route>
      <Route path="/reader" element={<Quanlydocgia />}> </Route>
      <Route path="/reader-detail" element={<Chitietdocgia />}>
        <Route path=":id" element={<Chitietdocgia />}></Route>
      </Route>
      <Route path="/quanlymuontra" element={<Quanlymuontra />}>
        <Route path=":iddocgia" element={<Quanlymuontra />}></Route>
      </Route>
     
      </Routes>
     

    </div>
  )
}

export default App