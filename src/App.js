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
import Chitietmuontra from './Page/Chitietmuontra';
import Dangky from './Page/Dangky';
import Dangnhap from './Page/Dangnhap';
import Index from './Page/Index';
import Quenmk from './Page/Quenmk';
import Doimk from './Page/Doimk';
import Headeradmin from './Layout/Headeradmin';
import Quanlytaikhoan from './Page/Quanlytaikhoan';
export const LoginContext = createContext()



const App = () => {

  const [login, setLogin] = useState()
  const [items, setItems] = useState();
    
     useEffect(() => {
      const item = JSON.parse(localStorage.getItem('dangnhap'));
      if (item) {
       setItems(item.phanquyen);
      }
      
    }, [items]);


  return (
    <div>
      <LoginContext.Provider  value={{
        login: login,
        setLogin: setLogin,
      }} >
      
      { 
        items == "Quản Trị" || login == "Quản Trị" ? (<Headeradmin></Headeradmin>): (<Header></Header>)
      }
     
      <Routes>
      <Route path="/quanlysach" element={<Quanlysach />}></Route>
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
      <Route path="/chitietdonmuon" element={<Chitietmuontra />}>
        <Route path=":iddonmuon" element={<Chitietmuontra />}></Route>
      </Route>
      <Route path='/dangky' element={<Dangky></Dangky>}></Route>
      <Route path='/dangnhap' element={<Dangnhap></Dangnhap>}></Route>
      <Route path='/doimatkhau' element={<Doimk></Doimk>}></Route>
      <Route path='/quenmatkhau' element={<Quenmk></Quenmk>} ></Route>
      <Route path='/quanlytaikhoan' element={<Quanlytaikhoan></Quanlytaikhoan>} ></Route>
      <Route path='/' element={<Index></Index>}></Route>
      </Routes>
      </LoginContext.Provider>
      
    </div>
    
  )
}

export default App