import React from 'react'
import { useState, useEffect, useContext } from "react";
import { NavLink, useSearchParams , useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form,FormGroup,Label,Input, Row } from "reactstrap";
import swal from 'sweetalert'
import "../Css/detail.css"
import { useParams } from "react-router-dom";


const Chitiet = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({})

    

      useEffect(() => {
        fetch(
            `https://6361bcc9fabb6460d8fe204f.mockapi.io/sach/` + params.id
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
           
            setBook(data);
          });
      }, []);
    

     const handleDelete = (id) => {
        fetch(`https://6361bcc9fabb6460d8fe204f.mockapi.io/sach/` + id,
        {
        method: 'DELETE',
      })
      .then(res => res.text()) 
      swal({
        title: "Are you sure?",
        text: "Are you sure that you want to delete this book?",
        icon: "warning",
        dangerMode: true,
      })
      .then(willDelete => {
        if (willDelete) {
          swal("Deleted!", "Your imaginary file has been deleted!", "success");
          navigate('/')
        }
      });

     }


  return (
    <form className='background-detail' >
       
        <div className='form-detail'>
            <img className='img-book' src={book.hinhanh}></img>
            <div className='info-book'>
                <h2 className='book-name'>{book.tensach}</h2>
                <p className='book-id'>Mã Sách: {book.id}</p>
                <p className='book-tacgia'>Tác Giả: {book.tacgia}</p>
                <p className='book-loaisach'>Thể Loại: {book.loaisach}</p>
                <p className='book-nxb'>Nhà Xuất Bản: {book.nhaxuatban}</p>
                <p className='book-nam'>Năm Xuất Bản: {book.namxuatban}</p>
                <p className='book-dongia'> {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(book.dongia)}</p>
                <p className='book-soluong'>Số Lượng: {book.soluong}</p>
                <Button className='btn-delete' color='danger'  onClick={()=>handleDelete(book.id)}>Xoá</Button>
            </div>
           
        </div>
      
    </form>
  )
}

export default Chitiet