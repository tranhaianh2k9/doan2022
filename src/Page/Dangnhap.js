
import '../Css/dangnhap.css'

import React from 'react'
import { useState, useEffect, useContext } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert'

const Dangnhap = () => {
  const navigate = useNavigate()
  
  const [inputEmail, setInputEmail] = useState()
  const [inputPass, setInputPass] = useState()
  const [listData, setListData] = useState()

  
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
  const handleInputPass = (e)  =>{
    setInputPass(e.target.value)
  }

 function checkLogin(pass , email ){
  let login 
    for(let i = 0; i <listData.length; i ++){
      if (listData[i].email=== email && listData[i].matkhau=== pass){
        localStorage.setItem('dangnhap', JSON.stringify(listData[i].id));
          login = true;
      }else{
        login = false
      }
    }
    return login
 }  

const  dangnhap = () =>{
  if(inputPass == null || inputEmail == null){
    swal("Oops!", "Không được để trống!", "error")
  } else if (checkLogin(inputPass,inputEmail) == false){
    swal("Oops!", "sai Email hoặc mật khẩu!", "error")
  } else {
   
    swal("Đăng Nhập Thành Công", "  ", "success");
    navigate('/quanlysach')
    
  }
 
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
            <FormGroup>
                <FormText>
                    Chưa có tài khoản, ấn vào <Link to='/dangky'>đây </Link>để đăng ký!
                </FormText>
            </FormGroup>
        </div>

    </div>
</div>
)
}

export default Dangnhap