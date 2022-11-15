import React from 'react'
import { useState, useEffect, useContext } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, Row } from "reactstrap";
import swal from 'sweetalert'
import "../Css/index.css"

const Quanlysach = () => {

    const [datainputNam, setDataInputNam] = useState('')
    const [datainputDongia, setDataInputDongia] = useState('')
    const [datainputId, setDataInputId] = useState('')
    const [datainputten, setDataInputTen] = useState('')
    const [datainputSoluong, setDataInputSoluong] = useState('')
    const [datainputHinhanh, setDataInputHinhanh] = useState('')
    const [datainputNxb, setDataInputNxb] = useState('')
    const [datainputTacgia, setDataInputTacgia] = useState('')
    const [datainputLoaisach, setDataInputLoaisach] = useState('')
    const [first, setFirst] = useState([])

    const navigate = useNavigate()

    const [isCreated, setIsCreate] = useState(true)
    const [formName, setFormName] = useState('')
    const [listBooks, setListBooks] = useState([])
    const [view, setView] = useState(true)
    const [add, setAdd] = useState(false)
    const [search, setSearch] = useState()
    const [loadLoaisach, setLoadLoaisach] = useState([])

    useEffect(() => {
        if (search == null) {
            axios
                .get(`https://6361bcc9fabb6460d8fe204f.mockapi.io/sach`)
                .then((res) => {
                    const data = res.data;
                    setListBooks(data);
                    setFirst(data)
                });


        } else {
            axios
                .get(`https://6361bcc9fabb6460d8fe204f.mockapi.io/sach?search=${search}`)
                .then((res) => {
                    const data = res.data;
                    setListBooks(data);
                });
        }
    }, [isCreated, search]);

    useEffect(() => {
        axios
            .get(`https://6361bcc9fabb6460d8fe204f.mockapi.io/loaisach`)
            .then((res) => {
                const data = res.data;
                setLoadLoaisach(data);
            });

    }, []);

    function clearInput() {
        setDataInputId("")
        setDataInputSoluong("")
        setDataInputNxb("")
        setDataInputHinhanh("")
        setDataInputTen("")
        setDataInputTacgia("")
        setDataInputLoaisach("")
        setDataInputNam("")
        setDataInputDongia("")
    }

    const inputSoluong = (e) => {
        setDataInputSoluong(e.target.value)
    }
    const inputNam = (e) => {
        setDataInputNam(e.target.value)
    }
    const inputDongia = (e) => {
        setDataInputDongia(e.target.value)
    }
    const inputNxb = (e) => {
        setDataInputNxb(e.target.value)
    }
    const inputHinhanh = (e) => {
        setDataInputHinhanh(e.target.value)
    }
    const inputTensach = (e) => {
        setDataInputTen(e.target.value)
    }
    const inputTacgia = (e) => {
        setDataInputTacgia(e.target.value)
    }
    const inputLoaisach = (e) => {
        setDataInputLoaisach(e.target.value)
    }

    function checkInvalid(string) {
        let invalid = true
        for (let i = 0; i < listBooks.length; i++) {
            if (string.split(" ").join("").toLowerCase() === listBooks[i].tensach.split(" ").join("").toLowerCase()) {
                invalid = false
                break;
            }

        }

        return invalid
    }


    function checkInvalidEdit(string, id) {
        let invalid = true
        const danhsach = listBooks.filter(iteam => iteam.id !== id)

        for (let i = 0; i < danhsach.length; i++) {
            if (string.split(" ").join("").toLowerCase() === danhsach[i].tensach.split(" ").join("").toLowerCase()) {
                invalid = false
                break;
            }

        }

        return invalid
    }

    const handleThemsach = () => {

        if (datainputten == "" || datainputSoluong == "" || datainputTacgia == "" || datainputLoaisach == "") {
            swal("Oops!", "Hãy nhập đủ các trường có dấu* !", "error")
        }
        else if (datainputSoluong < 0 || datainputDongia < 0 || datainputNam < 0) {
            swal("Oops!", "Số lượng phải lớn hơn 0 !", "error")
        }
        else if (checkInvalid(datainputten) == false) {
            swal("Oops!", "Tên sách đã tồn tại !", "error")
        }
        else {

            const newSach = {
                tensach: datainputten,
                soluong: datainputSoluong,
                tacgia: datainputTacgia,
                loaisach: datainputLoaisach,
                nhaxuatban: datainputNxb,
                hinhanh: datainputHinhanh,
                namxuatban: datainputNam,
                dongia: parseInt(datainputDongia) 
            }

            fetch("https://6361bcc9fabb6460d8fe204f.mockapi.io/sach", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(newSach),
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
        const book = [...listBooks];
        const index = book.findIndex((item) => {
            return item.id === id


        });
        setDataInputId(book[index].id)
        setDataInputSoluong(book[index].soluong)
        setDataInputNxb(book[index].nhaxuatban)
        setDataInputHinhanh(book[index].hinhanh)
        setDataInputTen(book[index].tensach)
        setDataInputTacgia(book[index].tacgia)
        setDataInputLoaisach(book[index].loaisach)
        setDataInputDongia(book[index].dongia)
        setDataInputNam(book[index].namxuatban)
    };

    const handleEditSave = () => {

        if (datainputten == "" || datainputSoluong == "" || datainputTacgia == "" || datainputLoaisach == "") {
            swal("Oops!", "Hãy nhập đủ các trường có dấu* !", "error")
        }
        else if (datainputSoluong < 1) {
            swal("Oops!", "Số lượng phải lớn hơn 0 !", "error")
        }
        else if (checkInvalidEdit(datainputten, datainputId) == false) {
            swal("Oops!", "Tên sách đã tồn tại !", "error")
        }
        else {

            fetch("https://6361bcc9fabb6460d8fe204f.mockapi.io/sach/" + datainputId, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify({
                    tensach: datainputten,
                    soluong: datainputSoluong,
                    tacgia: datainputTacgia,
                    loaisach: datainputLoaisach,
                    nhaxuatban: datainputNxb,
                    hinhanh: datainputHinhanh,
                    namxuatban: datainputNam,
                    dongia: parseInt(datainputDongia) 
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

    const handleView = () => {
        setView(!view)
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
        <div>
            <div className="search-form">
                <div className="search-span">
                    Tìm kiếm <input className="input-search" type="text" onChange={handleSearch} />
                </div>
                {!add == true ? (<button className='button-themmoi' onClick={handleOpenAdd}> Thêm mới </button>)
                    : ("")}

                 <span><i class="fa-solid fa-eye" onClick={handleView}></i> <p className='p-tongsach'>Số Đầu Sách: {first.length} </p> </span>
            </div>
            {add == true ? (
                <div className='form-add'>
                    <h2 className='header-Them'> {formName} </h2>

                    <div className='input-data'>

                        <div className='input-left'>
                            {formName === 'Edit' ? (<span className='span-input'> ID Sách  <input className='input-text-add' type="number" value={datainputId} disabled ></input></span>) : ('')

                            }
                            <span className='span-input'>  Số Lượng *  <input className='input-text-add' type="number" value={datainputSoluong} onChange={inputSoluong}></input></span>
                            <span className='span-input'>Nhà Xuất Bản<input className='input-text-add NXB' type="text" value={datainputNxb} onChange={inputNxb}></input></span>
                            <span className='span-input'> Hình Ảnh <input className='input-text-add' type="text" value={datainputHinhanh} onChange={inputHinhanh}></input></span>
                            <span className='span-input'>  Năm Xuất bản  <input className='input-text-add NXB' type="number" value={datainputNam} onChange={inputNam}></input></span>

                        </div>

                        <div className='input-right'>
                            <span className='span-input'>  Tên Sách * <input className='input-text-add' type="text" value={datainputten} onChange={inputTensach}></input></span>
                            <span className='span-input'> Tác Giả *<input className='input-text-add' type="text" value={datainputTacgia} onChange={inputTacgia}></input></span>
                            <span className='span-input'> Đơn Giá <input className='input-text-add' type="number" value={datainputDongia} onChange={inputDongia}></input></span>
                            <span className='span-input'> Loại Sách *<select className='input-text-add' value={datainputLoaisach} onChange={inputLoaisach}>

                                <option></option>
                                {
                                    loadLoaisach.map((item) => {
                                        return (
                                            <option>{item.tenloaisach}</option>
                                        )
                                    })
                                }
                            </select>
                            </span>

                        </div>
                    </div>

                    <div className='button-formadd'>
                        <Button color="secondary" className='button-thoat' onClick={handleOpenAdd}> Thoát </Button>
                        {
                            formName === "Add New" ? (<Button className='button-them' color="success" onClick={handleThemsach}>Lưu Mới</Button>
                            ) : (<Button className='button-sua' color="success" onClick={handleEditSave}>Sửa</Button>)
                        }
                    </div>

                </div>
            ) : ("")
            }
            {view == true ? (<table className="table table-success table-bordered table-striped">
                <thead>
                    <tr className='tr-table'>
                        <th scope="col">id</th>
                        <th scope="col">Tên Sách</th>
                        <th scope="col">Số Lượng</th>
                        <th scope="col">Tác giả</th>
                        <th scope="col">Loại sách</th>
                        <th scope="col">Nhà Xuất Bản</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listBooks.map((item) => {
                        return (
                            <tr className='tr-table' >
                                <th scope="row">{item.id}
                                </th>
                                <td> {item.tensach}</td>
                                <td>{item.soluong}</td>
                                <td>{item.tacgia}</td>
                                <td> {item.loaisach}</td>
                                <td>{item.nhaxuatban}</td>
                                <td>
                                    {!add == true ? (<Button color="primary" className="btn-edit" onClick={() => handleEditClick(item.id)}>
                                        Sửa
                                    </Button>) : ("")
                                    }
                                    <Link className='link-index' to={`/detail/${item.id}`}> <Button color="info" >
                                        Chi Tiết
                                    </Button> </Link>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>) : (<div className="main-book">
                {listBooks.map((item) => {
                    return (
                        <div className="element">
                            <img className="img-element" src={item.hinhanh} alt="" />
                            <Link className='link-index' to={`/detail/${item.id}`}>  <div className="name-element">{item.tensach}</div> </Link>
                            <div className="tacgia-element"><span> Tác giả: </span>{item.tacgia}</div>
                            <div className="tacgia-element"><span> Số lượng: </span>{item.soluong}</div>
                        </div>
                    )
                })
                } </div>)
            }
        </div>
    )
}

export default Quanlysach