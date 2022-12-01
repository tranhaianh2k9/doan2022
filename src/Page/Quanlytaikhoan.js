
import React from 'react'
import { useState, useEffect, useContext } from "react"
import { Link, useSearchParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { Button, Form, FormGroup, Label, Input, Row } from "reactstrap"
import swal from 'sweetalert'
import "../Css/qldocgia.css"

const Quanlytaikhoan = () => {
    const [datainputId, setDataInputId] = useState('')
    const [datainputten, setDataInputTen] = useState('')
    const [datainputphanquyen, setDataInputPhanquyen] = useState('')
  
    const [datainputsdt, setDataInputSdt] = useState('')
    const [datainputcccd, setDataInputCccd] = useState('')
    const [datainputemail, setDataInputEmail] = useState('')

    const navigate = useNavigate()

    const [isCreated, setIsCreate] = useState(true)
 
    const [add, setAdd] = useState(false)
    const [search, setSearch] = useState()
    const [listTaikhoan, setListTaikhoan] = useState([])
    const [firstListreader, setFirstListReader] = useState([])
   

    useEffect(() => {
        if (search == null) {
            axios
                .get(`https://636d193fab4814f2b278a69c.mockapi.io/taikhoan`)
                .then((res) => {
                    const data = res.data;
                    setListTaikhoan(data);
                    setFirstListReader(data)
                });

        } else {
            axios
                .get(`https://636d193fab4814f2b278a69c.mockapi.io/taikhoan?search=${search}`)
                .then((res) => {
                    const data = res.data;
                    setListTaikhoan(data)
                });
        }
    }, [isCreated, search]);

   
    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/.test(mail)) {
            return (true)
        }
        return (false)
    }

    const inputTensach = (e) => {
        setDataInputTen(e.target.value)
    }
 
   const inputPhanquyen = (e) => {
    setDataInputPhanquyen(e.target.value)
   }
    const inputCccd = (e) => {
        setDataInputCccd(e.target.value)
    }
    const inputEmail = (e) => {
        setDataInputEmail(e.target.value)
    }
    const inputsdt = (e) => {
        setDataInputSdt(e.target.value)
    }

    
    const handleEditClick = (id) => {
        setAdd(true)
        const loai = [...listTaikhoan];
        const index = loai.findIndex((item) => {
            return item.id === id
        });
        setDataInputId(loai[index].id)
        setDataInputTen(loai[index].hoten)
        setDataInputPhanquyen(loai[index].phanquyen)
        setDataInputEmail(loai[index].email)
        setDataInputSdt(loai[index].sdt)
        setDataInputCccd(loai[index].cmnd)
    };

    const handleEditSave = () => {

        if (datainputten === "" ||  datainputemail === "" || datainputphanquyen === "" || datainputsdt === "" || datainputcccd === "") {
            swal("Oops!", "Không được để trống!", "error")
        } else if (datainputcccd < 1 || datainputsdt < 1) {
            swal("Oops!", "Không được nhập số nhỏ hơn 0!", "error")
        } else if (!ValidateEmail(datainputemail)) {
            swal("Oops!", "Không đúng định dạng Email!", "error")
        } else if (datainputsdt.length !== 10) {
            swal("Oops!", "Không đúng định dạng số điện thoại!", "error")
        } else if (datainputcccd.length !== 12) {
            swal("Oops!", "Không đúng định dạng CCCD!", "error")
        }
        else {

            fetch(`https://636d193fab4814f2b278a69c.mockapi.io/taikhoan/` + datainputId, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify({
                    hoten: datainputten,
                    sdt: datainputsdt,
                    cmnd: datainputcccd,
                    email: datainputemail,
                    phanquyen: datainputphanquyen
                }),
            })
                .then(function (res) {
                    return res.json();
                })
                .then(function () {
                    setIsCreate(!isCreated);
                });

            swal("Sửa thành công", "    ", "success");
          
            setAdd(false)
        }
    }

    const handleRemoveClick = (id) =>{
        fetch(`https://636d193fab4814f2b278a69c.mockapi.io/taikhoan/` + id,
        {
            method: 'DELETE',
        })
        .then(res => res.text())
    swal({
        title: "Are you sure?",
        text: "Are you sure that you want to delete this?",
        icon: "warning",
        dangerMode: true,
    })
        .then(willDelete => {
            if (willDelete) {
                swal("Deleted!", " has been deleted!", "success");
                setIsCreate(!isCreated);
            }
        });
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    const handleOpenAdd = () => {
        
        setAdd(false)
        
    }
    return (
        <div >
            <div className="search-form">
                <div className="search-span">
                    Tìm kiếm <input className="input-search" type="text" onChange={handleSearch} />
                </div>
            </div>
            {add == true ? (
                <div className='form-add-form-docgia'>
                    <h2 className='header-Them-form-docgia'> Edit </h2>
                    <div className='inputdata-form-docgia'>
                        <div className='input-left-form-docgia'>
                          <span className='span-input-form-docgia'> ID Đọc giả  <input className='input-text-add-form-docgia' type="number" value={datainputId} disabled ></input></span>
                            <span className='span-input-form-docgia'>  Họ Tên* <input className='input-text-add-form-docgia' type="text" value={datainputten} onChange={inputTensach}></input></span>
                            <span className='span-input-form-docgia'>  Phân Quyền* <select className='input-text-add-form-docgia' type="date" value={datainputphanquyen} onChange={inputPhanquyen}>
                              
                                <option>Quản Trị</option>
                                <option>Thủ Thư</option>
                                </select></span>
                          

                        </div>

                        <div className='input-right-form-docgia'>
                            <span className='span-input-form-docgia'> CCCD* <input className='input-text-add-form-docgia' type="number" value={datainputcccd} onChange={inputCccd}></input></span>
                            <span className='span-input-form-docgia'>  Email * <input className='input-text-add-form-docgia' type="email" value={datainputemail} onChange={inputEmail}></input></span>
                            <span className='span-input-form-docgia'>   Số Điện Thoại* <input className='input-text-add-form-docgia' type="number" value={datainputsdt} onChange={inputsdt}></input></span>

                        </div>
                    </div>

                    <div className='button-formadd-formdocgia'>
                    <Button color="secondary" className='button-thoat-form-docgia' onClick={handleOpenAdd}> Thoát </Button>
                    <Button className='button-sua-form-docgia' color="success" onClick={handleEditSave}>Sửa</Button>
                        
                    </div>
                </div>

            ) : ("")
            }
            <div class="main-docgia">
                <table className="table table-success table-bordered table-striped ">
                    <thead>
                        <tr className='tr-table'>
                            <th scope="col">id</th>
                            <th scope="col">Họ Tên</th>
                            <th scope="col">Số Điện Thoại</th>
                            <th scope="col">CCCD</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phân Quyền</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listTaikhoan.map((item) => {
                            return (
                                <tr className='tr-table' >
                                    <th scope="row">{item.id}
                                    </th>
                                    <td> {item.hoten}</td>
                                    <td> {item.sdt}</td>
                                    <td> {item.cmnd}</td>
                                    <td> {item.email}</td>
                                    <td> {item.phanquyen}</td>
                                    <td>
                                       <Button color="primary" className="btn-edit" onClick={() => handleEditClick(item.id)}>
                                            Sửa
                                        </Button>
                                        <Button color="info" onClick={() => handleRemoveClick(item.id)}>
                                             Xóa
                                        </Button> 
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}



export default Quanlytaikhoan