import React from 'react'
import { useState, useEffect, useContext } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, Row } from "reactstrap";
import swal from 'sweetalert'
import "../Css/qldocgia.css";

const Quanlydocgia = () => {

    const [datainputId, setDataInputId] = useState('')
    const [datainputten, setDataInputTen] = useState('')
    const [datainputngaysinh, setDataInputNgaysinh] = useState('')
    const [datainputdiachi, setDataInputDiachi] = useState('')
    const [datainputsdt, setDataInputSdt] = useState('')
    const [datainputcccd, setDataInputCccd] = useState('')
    const [datainputemail, setDataInputEmail] = useState('')

    const navigate = useNavigate()

    const [isCreated, setIsCreate] = useState(true)
    const [formName, setFormName] = useState('')
    const [add, setAdd] = useState(false)
    const [search, setSearch] = useState()
    const [listDocgia, setListDocgia] = useState([])
    const [firstListreader, setFirstListReader] = useState([])
    const [dangmuon,setDangmuon]  =useState([])
    const [trehen,setTrehen]  =useState([])
    const [chuaco,setChuaco]  =useState([])

    useEffect(() => {
        if (search == null) {
            axios
                .get(`https://6361bcc9fabb6460d8fe204f.mockapi.io/docgia`)
                .then((res) => {
                    const data = res.data;
                    
                    setListDocgia(data);
                    setFirstListReader(data)

                   setDangmuon( data.filter((item) => item.trangthai == "Đang Mượn")) 
                   setTrehen( data.filter((item) => item.trangthai == "Trễ Hạn")) 
                   setChuaco( data.filter((item) => item.trangthai == "chưa có đơn mượn")) 
                 
                });

        } else {
            axios
                .get(`https://6361bcc9fabb6460d8fe204f.mockapi.io/docgia?search=${search}`)
                .then((res) => {
                    const data = res.data;
                    setListDocgia(data);
                });
        }
    }, [isCreated, search]);

    function clearInput() {
        setDataInputId("")
        setDataInputTen("")
        setDataInputCccd("")
        setDataInputDiachi("")
        setDataInputEmail("")
        setDataInputSdt("")
        setDataInputNgaysinh("")
    }
    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        return (false)
    }

    const inputTensach = (e) => {
        setDataInputTen(e.target.value)
    }
    const inputNgaysinh = (e) => {
        setDataInputNgaysinh(e.target.value)
    }
    const inputDiachi = (e) => {
        setDataInputDiachi(e.target.value)
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

    const handleThem = () => {
        if (datainputten === "" || datainputngaysinh === "" || datainputemail === "" || datainputdiachi === "" || datainputsdt === "" || datainputcccd === "") {
            swal("Oops!", "Không được để trống!", "error")
        } else if (datainputcccd < 1 || datainputsdt < 1) {
            swal("Oops!", "Không được nhập số nhỏ hơn 0!", "error")
        } else if (!ValidateEmail(datainputemail)) {
            swal("Oops!", "Không đúng định dạng Email!", "error")
        } else if (datainputsdt.length !== 10) {
            swal("Oops!", "Không đúng định dạng số điện thoại!", "error")
        }
        else {
            const newdocgia = {
                ten: datainputten,
                ngaysinh: datainputngaysinh,
                diachi: datainputdiachi,
                sodienthoai: datainputsdt,
                cccd: datainputcccd,
                email: datainputemail,
                trangthai: 'chưa có đơn mượn',
            }

            fetch("https://6361bcc9fabb6460d8fe204f.mockapi.io/docgia", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(newdocgia),
            })
                .then(function (res) {
                    return res.json();
                })
                .then(function () {
                    setIsCreate(!isCreated);
                });
            swal("Thêm thành công", "    ", "success");
            clearInput()
        }
    }
    const handleEditClick = (id) => {
        setFormName("Edit")
        setAdd(!add)
        const loai = [...listDocgia];
        const index = loai.findIndex((item) => {
            return item.iddocgia === id


        });
        setDataInputId(loai[index].iddocgia)
        setDataInputTen(loai[index].ten)
        setDataInputDiachi(loai[index].diachi)
        setDataInputEmail(loai[index].email)
        setDataInputNgaysinh(loai[index].ngaysinh)
        setDataInputSdt(loai[index].sodienthoai)
        setDataInputCccd(loai[index].cccd)
    };

    const handleEditSave = () => {

        if (datainputten === "" || datainputngaysinh === "" || datainputemail === "" || datainputdiachi === "" || datainputsdt === "" || datainputcccd === "") {
            swal("Oops!", "Không được để trống!", "error")
        } else if (datainputcccd < 1 || datainputsdt < 1) {
            swal("Oops!", "Không được nhập số nhỏ hơn 0!", "error")
        } else if (!ValidateEmail(datainputemail)) {
            swal("Oops!", "Không đúng định dạng Email!", "error")
        } else if (datainputsdt.length !== 10) {
            swal("Oops!", "Không đúng định dạng số điện thoại!", "error")
        }
        else {

            fetch("https://6361bcc9fabb6460d8fe204f.mockapi.io/docgia/" + datainputId, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify({
                    ten: datainputten,
                    ngaysinh: datainputngaysinh,
                    diachi: datainputdiachi,
                    sodienthoai: datainputsdt,
                    cccd: datainputcccd,
                    email: datainputemail
                }),
            })
                .then(function (res) {
                    return res.json();
                })
                .then(function () {
                    setIsCreate(!isCreated);
                });

            swal("Sửa thành công", "    ", "success");
            clearInput()
            setAdd(!add)
        }
    }

    const loadSach = (item) => {
        const listProduct = firstListreader.filter((data) => data.trangthai == item);
        setListDocgia([...listProduct]);
    }
    const loadlaidanhsach = () => {
        setListDocgia(firstListreader)
    }
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    const handleOpenAdd = () => {
        setFormName("Add New")
        setAdd(!add)
        clearInput()
    }
    return (
        <div >
            <div className="search-form">
                <div className="search-span">
                    Tìm kiếm <input className="input-search" type="text" onChange={handleSearch} />
                </div>
                {!add == true ? (<button className='button-themmoi' onClick={handleOpenAdd}> Thêm mới </button>)
                    : ("")}
            </div>
            {add == true ? (
                <div className='form-add-form-docgia'>
                    <h2 className='header-Them-form-docgia'> {formName} </h2>
                    <div className='inputdata-form-docgia'>
                        <div className='input-left-form-docgia'>
                            {formName === 'Edit' ? (<span className='span-input-form-docgia'> ID Đọc giả  <input className='input-text-add-form-docgia' type="number" value={datainputId} disabled ></input></span>) : ('')

                            }
                            <span className='span-input-form-docgia'>  Họ Tên * <input className='input-text-add-form-docgia' type="text" value={datainputten} onChange={inputTensach}></input></span>
                            <span className='span-input-form-docgia'>  Ngày Sinh * <input className='input-text-add-form-docgia' type="date" value={datainputngaysinh} onChange={inputNgaysinh}></input></span>
                            <span className='span-input-form-docgia'> Địa Chỉ * <input className='input-text-add-form-docgia' type="text" value={datainputdiachi} onChange={inputDiachi}></input></span>

                        </div>

                        <div className='input-right-form-docgia'>
                            <span className='span-input-form-docgia'>  CCCD* <input className='input-text-add-form-docgia' type="number" value={datainputcccd} onChange={inputCccd}></input></span>
                            <span className='span-input-form-docgia'>  Email * <input className='input-text-add-form-docgia' type="email" value={datainputemail} onChange={inputEmail}></input></span>
                            <span className='span-input-form-docgia'>   Số Điện Thoại* <input className='input-text-add-form-docgia' type="number" value={datainputsdt} onChange={inputsdt}></input></span>

                        </div>

                    </div>

                    <div className='button-formadd-formdocgia'>
                        <Button color="secondary" className='button-thoat-form-docgia' onClick={handleOpenAdd}> Thoát </Button>
                        {
                            formName === "Add New" ? (<Button className='button-them-form-docgia' color="success" onClick={handleThem}>Lưu Mới</Button>
                            ) : (<Button className='button-sua-form-docgia' color="success" onClick={handleEditSave}>Sửa</Button>)
                        }
                    </div>
                </div>

            ) : ("")
            }
            <div class="main-docgia">
                <div className='form-quanly-docgia'>
                    <div className='item-quanly-docgia tong'onClick={loadlaidanhsach} >
                        <p className='p-item-quanly'>Tổng Số Đọc Giả: {firstListreader.length}</p>
                    </div>
                    <div className='item-quanly-docgia green' onClick={()=>loadSach('Đang Mượn')}>
                        <p className='p-item-quanly'> Đang Mượn: {dangmuon.length}</p>
                    </div>
                    <div className='item-quanly-docgia red' onClick={()=>loadSach('Trễ Hạn')}>
                        <p className='p-item-quanly'>Trễ Hẹn: {trehen.length}</p>
                    </div>
                    <div className='item-quanly-docgia gray' onClick={()=>loadSach('chưa có đơn mượn')}>
                        <p className='p-item-quanly'>chưa có đơn mượn: {chuaco.length}</p>
                    </div>
                </div>
                <table className="table table-success table-bordered table-striped table-form-docgia">
                    <thead>
                        <tr className='tr-table'>
                            <th scope="col">id</th>
                            <th scope="col">Họ Tên</th>
                            <th scope="col">Ngày Sinh</th>
                            <th scope="col">Địa Chỉ</th>
                            <th scope="col">Số Điện Thoại</th>
                            <th scope="col">CCCD</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listDocgia.map((item) => {
                            return (
                                <tr className='tr-table' >
                                    <th scope="row">{item.iddocgia}
                                    </th>

                                    <td> {item.ten}</td>
                                    <td> {item.ngaysinh}</td>
                                    <td> {item.diachi}</td>
                                    <td> {item.sodienthoai}</td>
                                    <td> {item.cccd}</td>
                                    <td> {item.email}</td>
                                    <td>
                                        {!add == true ? (<Button color="primary" className="btn-edit" onClick={() => handleEditClick(item.iddocgia)}>
                                            Sửa
                                        </Button>) : ("")
                                        }
                                        <Link className='link-index' to={`/reader-detail/${item.iddocgia}`}> <Button color="info" >
                                            Chi Tiết
                                        </Button> </Link>
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


export default Quanlydocgia