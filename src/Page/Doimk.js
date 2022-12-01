
import React from 'react'
import { useState, useEffect, useContext } from "react";
import '../Css/doimatkhau.css'
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert'


const Doimk = () => {
    const [inputOldPass, setInputOldPass] = useState()
    const [inputPass, setInputPass] = useState()
    const [inputRePass, setInputRePass] = useState()
    const [items, setItems] = useState();
    const navigate = useNavigate()
    useEffect(() => {
    const items = JSON.parse(localStorage.getItem('dangnhap'));
        setItems(items);
     }, []);

 
    const handleInputOldPass = (e) => {
        setInputOldPass(e.target.value)
    }
    const handleInputPass = (e) => {
        setInputPass(e.target.value)
    }

    const handleInputRePass = (e) => {
        setInputRePass(e.target.value)
    }


    const doimatkhau =()=>{
        if(inputOldPass == null || inputRePass == null || inputPass == null){
            swal("Oops!", "Không được để trống!", "error")
        }else if( inputPass !== inputRePass){
            swal("Oops!", "Mật khẩu không giống nhau", "error")
        } else if(inputOldPass !== items.matkhau){
            swal("Oops!", "Nhập sai mật khẩu cũ", "error")
        } else{
            fetch("https://636d193fab4814f2b278a69c.mockapi.io/taikhoan/" + items.id, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify({
                    matkhau: inputPass
                }),
            })
                .then(function (res) {
                    return res.json();
                })
                .then(function () {
                    localStorage.setItem('dangnhap', JSON.stringify({
                        id: items.id,
                        ten: items.hoten,
                        phanquyen: items.phanquyen,
                        matkhau: inputPass
                      }));

                    swal("Đổi Mật Khẩu Thành Công", "    ", "success");
                    navigate('/quanlysach')
                });
        }
    }
    

  return (
    <div >
        <div className='formdoimk'>
            <h2 className='header-formdoimk'>Đổi Mật Khẩu</h2>
            <FormGroup>
                <Label for="exampleEmail">
                    Mật Khẩu Cũ
                </Label>
                <Input
                     type="password"
                    onChange={handleInputOldPass}
                  
                />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">
                    Mật Khẩu Mới
                </Label>
                <Input
                    type="password"
                    onChange={handleInputPass}
                  
                />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">
                    Nhập Lại Mật Khẩu
                </Label>
                <Input
                 onChange={handleInputRePass}
                    type="password"
                    
                />
            </FormGroup>
            <Button color='success' onClick={doimatkhau}>
               Xác Nhận
            </Button>
          
        </div>

    </div>
  )
}

export default Doimk