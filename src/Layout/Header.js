import React from 'react'
import {Link} from 'react-router-dom'
import "../Css/header.css"

const Header = () => {

    const handleClick = () => {
        localStorage.removeItem("iddocgia")
    }
    return (
        <div>

            <header className="header-index">
                <span className="title-header">Quản Lý Thư Viện </span>
                <span className="name-login"><i className="fa-sharp fa-solid fa-user" /><span> Admin</span></span>
            </header>
            <div className="tag-bar">
                <li  className="li-tagbar"> <Link  to="/quanlysach" className='link-tagbar' > Quản Lý Sách </Link>
                </li>
                <li className="li-tagbar"> <Link  to ="/category" className='link-tagbar'> Loại Sách </Link>
                </li>
                <li className="li-tagbar"> <Link to ="/reader" className='link-tagbar' > Quản Lý Đọc Giả </Link>
                </li>
                <li className="li-tagbar"> <Link to= "/quanlymuontra" onClick={handleClick} className='link-tagbar' > Quản Lý Mượn Trả </Link>
                </li>
               
            </div>

        </div>

    )
}

export default Header