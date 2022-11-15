
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
  
    useEffect(() => {
    const items = JSON.parse(localStorage.getItem('dangnhap'));
        setItems(items);
       
     }, []);

 
    const handleInputOldPass = () => {
        
    }
    const handleInputPass = () => {
        
    }

    const handleInputRePass = () => {
        
    }


    const doimatkhau =()=>{

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
                    id="exampleEmail"
                    name="email"
                    type="email"
                    onChange={handleInputOldPass}
                    value={inputOldPass}
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
            <FormGroup>
                <Label for="examplePassword">
                    Nhập Lại Mật Khẩu
                </Label>
                <Input
                 onChange={handleInputRePass}
                    type="password"
                    value={inputRePass}
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