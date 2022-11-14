
import React from 'react'
import { useState, useEffect, useContext } from "react";
import '../Css/dangky.css'
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert'


const Dangky = () => {
    
    const [inputEmail, setInputEmail] = useState()
    const [inputPass, setInputPass] = useState()
    const [inputRePass, setInputRePass] = useState()
    const [inputName, setInputName] = useState()
    const [inputPhoneNum, setInputPhoneNum] = useState()
    const [inputCCCD, setInputCCCD] = useState()
    const [listData, setListData] = useState()
    
    const navigate = useNavigate()
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
    
    const handleInputRePass = (e)  =>{
        setInputRePass(e.target.value)
    }
    
    const handleInputName = (e)  =>{
        setInputName(e.target.value)
    }
    
    const handleInputPhoneNumber = (e)  =>{
        setInputPhoneNum(e.target.value)
    }
    
    const handleInputCMND = (e)  =>{
        setInputCCCD(e.target.value)
    }
    function checkivalid (string){
        let check = true
        for(let i = 0; i <listData.length; i++){
            if (listData[i].email == string){
                check = false
            }
        }

        return check
    }
    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        return (false)
    }
    
    const dangky = ()  =>{
        if ( inputName == null || inputPass == null || inputEmail == null || inputRePass == null|| inputPhoneNum == null || inputCCCD == null) {
            swal("Oops!", "Không được để trống!", "error")
        } else if (inputCCCD < 1 || inputPhoneNum < 1) {
            swal("Oops!", "Không được nhập số nhỏ hơn 0!", "error")
        } else if (!ValidateEmail(inputEmail)){
            swal("Oops!", "Không đúng định dạng Email!", "error")
        } else if (inputPhoneNum.length != 10){
            swal("Oops!", "Không đúng định dạng số điện thoại!", "error")
        }else if (inputCCCD.length != 12){
            swal("Oops!", "Không đúng định dạng CCCD!", "error")
        }else if (inputPass != inputRePass){
            swal("Oops!", "Mật khẩu nhập lại không giống!", "error")
        }else if (checkivalid(inputEmail) == false){
            swal("Oops!", "email bị trùng", "error")
        }else  {
            const newtaikhoan = {
                hoten: inputName,
               matkhau: inputPass,
                email: inputEmail,
                sdt: inputPhoneNum,
                cmnd: inputCCCD,
                
            }

            fetch("https://636d193fab4814f2b278a69c.mockapi.io/taikhoan", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(newtaikhoan),
            })
                .then(function (res) {
                    return res.json();
                })
                .then(function () {
                });
            swal("Đăng Ký Thành Công", "  ", "success");
            navigate('/dangnhap')
            
        }
    }

    return (
        <div >
            <div className='main-dangky'>
                <img className='image-background' src="https://thichchiase.com/wp-content/uploads/2016/01/87d7db3d93a94eacbaffc4680ea5c3b2-1200x675.jpg" />
                <div className='formdangky'>
                    <h2 className='header-formdangky'>Đăng Ký</h2>
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
                    <FormGroup>
                        <Label for="exampleEmail">
                            Họ Tên
                        </Label>
                        <Input
                            type="text"
                            onChange={handleInputName}
                            value={inputName}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">
                            Số Điện Thoại
                        </Label>
                        <Input
                            type="number"
                            onChange={handleInputPhoneNumber}
                            value={inputPhoneNum}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">
                            CMND
                        </Label>
                        <Input
                            type="number"
                            onChange={handleInputCMND}
                            value={inputCCCD}
                        />
                    </FormGroup>
                    <Button color='success' onClick={dangky}>
                        Đăng Ký
                    </Button>
                    <FormGroup>
                        <FormText>
                            Đã có tài khoản, ấn vào <Link to='/dangnhap'>đây </Link>để đăng nhập!
                        </FormText>
                    </FormGroup>
                </div>

            </div>
        </div>
    )
}


export default Dangky