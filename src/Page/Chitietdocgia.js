import React from 'react'
import { useState, useEffect, useContext } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, Row } from "reactstrap";
import swal from 'sweetalert'
import "../Css/reader-detail.css"
import { useParams } from "react-router-dom";

const Chitietdocgia = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [reader, setReader] = useState({})

    useEffect(() => {
        fetch(
            `https://6361bcc9fabb6460d8fe204f.mockapi.io/docgia/` + params.id
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                setReader(data);
            });
    }, []);

    const handleDeleteClick = (id) => {
        fetch(`https://6361bcc9fabb6460d8fe204f.mockapi.io/docgia/` + id,
            {
                method: 'DELETE',
            })
            .then(res => res.text())
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this reader?",
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    swal("Deleted!", " has been deleted!", "success");
                    navigate('/reader')
                }
            });
    }

    const handleTaodonClick = (id) => {
    localStorage.setItem('iddocgia', JSON.stringify(id));
     navigate('/quanlymuontra')
    }

    return (
        <div>
            <div className='main-reader-detail'>
                <h2 className='header-reader-detail'> Chi Tiết Đọc Giả</h2>
                <div className='info-reader-detail'>
                    <div className='info-left-reader'>
                        <p className='info-detail'> Họ Tên: {reader.ten}</p>
                        <p className='info-detail'>Ngày Sinh: {reader.ngaysinh}</p>
                        <p className='info-detail'>Số Điện Thoại: {reader.sodienthoai}</p>
                        <p className='info-detail'>Email: {reader.email}</p>
                    </div>
                    <div className='info-right-reader'>
                        <p className='info-detail'>Id: {reader.iddocgia}</p>
                        <p className='info-detail'>Địa chỉ: {reader.diachi}</p>
                        <p className='info-detail'> Mã Sinh Viên: {reader.cccd}</p>
                        <p className='info-detail'>Trạng Thái: {reader.trangthai}</p>
                    </div>
                </div>
                <div className='button-reader-detail'>
                    <Button className='' color='danger' onClick={() => handleDeleteClick(reader.iddocgia)} >Xóa</Button>
                    {reader.trangthai == "chưa có đơn mượn" ? (  <Button className='' color='success' onClick={() => handleTaodonClick(reader.iddocgia)}>Tạo Đơn Mượn</Button>) : ("")
                    }
                </div>
            </div>
        </div>
    )
}

export default Chitietdocgia