import React, { useEffect, useState, useContext} from 'react'
import { ctxLogin } from '../App';
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import "../Css/header.css"
import { Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,  } from "reactstrap";

const Headeradmin = () => {
    const navigate = useNavigate()
    const [items, setItems] = useState();
    const [dangnhap, setDangnhap] = useState();
  
    useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
        setItems(items);
  
     }, []);

    const handleClick = () => {
        localStorage.removeItem("iddocgia")
       
    }
    const dangxuat = () =>{
        localStorage.removeItem("dangnhap")
        navigate('/')
    }
    const doimk = () => {
        navigate("/doimatkhau")
    }

    return (
        <div>
            <header className="header-index">
                <span className="title-header">Quản Lý Thư Viện </span>
                <span className="name-login"><UncontrolledDropdown group>
                    <DropdownToggle  className='dropdow'
                        caret
                    />

                    <DropdownMenu>
                        <DropdownItem onClick={dangxuat}>
                            Đăng Xuất
                        </DropdownItem>
                        <DropdownItem onClick={doimk}>
                          Đổi Mật Khẩu
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown><span style={{ marginLeft: "10px" }}></span></span>
            </header>
            <div className="tag-bar">
                <li className="li-tagbar"> <Link to="/quanlysach" className='link-tagbar' > Quản Lý Sách </Link>
                </li>
                <li className="li-tagbar"> <Link to="/category" className='link-tagbar'> Loại Sách </Link>
                </li>
                <li className="li-tagbar"> <Link to="/reader" className='link-tagbar' > Quản Lý Đọc Giả </Link>
                </li>
                <li className="li-tagbar"> <Link to="/quanlymuontra" onClick={handleClick} className='link-tagbar' > Quản Lý Mượn Trả </Link>
                </li>
                <li className="li-tagbar"> <Link to="/quanlytaikhoan" onClick={handleClick} className='link-tagbar' > Quản Lý Tài Khoản</Link>
                </li>
            

            </div>

        </div>

    )
}

export default Headeradmin