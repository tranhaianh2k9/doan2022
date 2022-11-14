
import React from 'react'
import { useState, useEffect, useContext } from "react";
import '../Css/dangky.css'
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert'

const index = () => {
   
    return (
        <div >
        <div className='main-dangky'>
            <img className='image-background' src="https://thichchiase.com/wp-content/uploads/2016/01/87d7db3d93a94eacbaffc4680ea5c3b2-1200x675.jpg" />
            <div className='formdangky'>
                <h2 className='header-formdangky'>Quản Lý Thư Viện</h2>
                <Link to='/dangky' >  <Button  color='info'>
                    Đăng Ký
                </Button> </Link> 
              <Link to='/dangnhap' > <Button style={{marginLeft : "10px"}} color='success' >
                    Đăng Nhập
                </Button> </Link> 
                
            </div>
    
        </div>
    </div>
      )
}

export default index