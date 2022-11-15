import { useRef } from 'react';
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert'
import emailjs from "emailjs-com"
import '../Css/dangnhap.css'


const Quenmk = () => {
    
  const navigate = useNavigate()

  const [inputEmail, setInputEmail] = useState()
  const [listData, setListData] = useState()
  const [newPassword, setNewPassword] = useState()

  const form = useRef();

  useEffect(() => {
    
    setNewPassword( Math.floor(Math.random() * 99999999) + 10000000)
    axios
      .get(`https://636d193fab4814f2b278a69c.mockapi.io/taikhoan`)
      .then((res) => {
        const data = res.data;
        setListData(data);
      });
  }, []);

  const handleInputEmail = (e) => {
    setInputEmail(e.target.value)
  }
  
  function checkEmail (){
    let checkIv = false
   
    for(let i = 0; i <listData.length; i++) {
        if (inputEmail === listData[i].email){
          checkIv = true
        }
    }
    return checkIv
  }

  const guimail = (e) => {
   if(inputEmail == null){
    e.preventDefault();
    swal("Oops!", "Không được để trống!", "error")
   } else if( checkEmail() == false) {
    e.preventDefault();
    swal("Oops!", "Email sai!", "error")
   } else {
    let id 
    for(let i = 0; i <listData.length; i++) {
      if (inputEmail === listData[i].email){
        id = listData[i].id
      }
    }
    e.preventDefault();
    emailjs.sendForm('service_mfe3oiq', 'template_fyik8at', form.current, 'yBgcD6qK_cEm86lye')
      .then((result) => {
    
      }, (error) => {
          console.log(error.text);
      });

      fetch("https://636d193fab4814f2b278a69c.mockapi.io/taikhoan/" + id , {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
            matkhau : newPassword.toString()
        }),
    }).then(function (res) {
      return res.json();
  })
  .then(function () {
    swal("Đã gửi email!", "  ", "success");
    navigate('/dangnhap')
  });}
   
   
  };


  const thoat = () =>{
    navigate('/dangnhap')
  }

  return (
    <div className='main-dangky' >
      <img className='image-background' src="https://thichchiase.com/wp-content/uploads/2016/01/87d7db3d93a94eacbaffc4680ea5c3b2-1200x675.jpg" />
    <div className='formdangky' style={{borderRadius:"8px"}}>
        <h2>Quên Mật Khẩu</h2>
        <form ref={form} onSubmit={guimail}>
        <input type="email" name='user_email' style={{marginBottom:"15px" , width:"280px" }} onChange={handleInputEmail} >
        </input>
        <input type="password" name='password' value={newPassword} style={{display:"none"}} >
        </input>
        <div className='div-button'>
        <Button color='info' type="submit"> Gửi </Button>
        <Button color='secondary'style={{marginLeft:"7px"}} onClick={thoat} >Thoát</Button>
        </div>
       
      </form>
    </div>
    </div>
  )
}

export default Quenmk