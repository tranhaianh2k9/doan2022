
import '../Css/dangnhap.css'
import { useRef } from 'react';
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert'
import emailjs from "emailjs-com"
import { LoginContext } from '../App';



const Dangnhap = () => {


  const navigate = useNavigate()
  const [isLogin, setisLogin] = useState()
  const [inputEmail, setInputEmail] = useState()
  const [inputPass, setInputPass] = useState()
  const [listData, setListData] = useState()
  const [newPassword, setNewPassword] = useState()
  const [idDoimk, setIDDoimk] = useState()
  const [isCreated, setIsCreated] = useState(true)

  const ctxlogin = useContext(LoginContext);

  const form = useRef();

  useEffect(() => {
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
  const handleInputPass = (e) => {
    setInputPass(e.target.value)
  }

  function checkLogin(pass, email) {
    let login = false

    for (let i = 0; i < listData.length; i++) {
      if (listData[i].email === email && listData[i].matkhau === pass) {
        localStorage.setItem('dangnhap', JSON.stringify({
          id: listData[i].id,
          ten: listData[i].hoten,
          phanquyen: listData[i].phanquyen,
          matkhau: listData[i].matkhau
        }));
        login = true;
        ctxlogin.setLogin(listData[i].phanquyen)
      }
    }
    return login
  }

  const dangnhap = () => {
    if (inputPass == null || inputEmail == null) {
      swal("Oops!", "Không được để trống!", "error")
    } else if (checkLogin(inputPass, inputEmail) == false) {
      swal("Oops!", "sai Email hoặc mật khẩu!", "error")
    } else {
      swal(`Đăng Nhập Thành Công `, "  ", "success");
      navigate('/quanlysach')  
    }

  }
  const quenmatkhau = () => {
    navigate('/quenmatkhau')
  }
 
 
  return (
    <div >
      <div className='main-dangky'>
        <img className='image-background' src="https://thichchiase.com/wp-content/uploads/2016/01/87d7db3d93a94eacbaffc4680ea5c3b2-1200x675.jpg" />
      
        <div className='formdangky'>
          <h2 className='header-formdangky'>Đăng Nhập</h2>
          <FormGroup>
            <Label for="exampleEmail">
              Email
            </Label>
            <Input
              id="exampleEmail"
              name="email"
              type="email"
              onChange={handleInputEmail}
              value={inputEmail}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">
              Mật Khẩu
            </Label>
            <Input
              type="password"
              onChange={handleInputPass}
              value={inputPass}
            />
          </FormGroup>
          <Button color='success' onClick={dangnhap}>
            Đăng Nhập
          </Button>
          <Button style={{ marginLeft: "10px" }} color='info' onClick={quenmatkhau}>
            Quên Mật Khẩu
          </Button>
          <FormGroup>
            <FormText >
              Chưa có tài khoản, ấn vào <Link to='/dangky'>đây </Link>để đăng ký!
            </FormText>
          </FormGroup>
        </div>

      </div>
    </div>
  )
}

export default Dangnhap