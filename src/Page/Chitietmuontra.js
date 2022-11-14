import React from 'react'
import { useState, useEffect, useContext } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, Row, NavItem } from "reactstrap";
import swal from 'sweetalert'
import "../Css/chitietmuontra.css"
import { useParams } from "react-router-dom";
import { compareAsc, format, add } from 'date-fns'

const Chitietmuontra = () => {

    const params = useParams();
    const navigate = useNavigate();
    const [donmuon, setDonmuon] = useState({})
    const [tensach, setTensach] = useState([])
    const [hinhanh, setHinhanh] = useState([])
    const [giahan, setGiahan] = useState()
    const [inputtinhtrangsach, setTinhtrangsach] = useState([])
    const [sotienphat, setSotienphat] = useState(0)
    const [tiensach, setTiensach] = useState([])
    const [view, setView] = useState(false)
    const [tientre, setTientre] = useState(0)
    const [idsach, setIdsach] = useState([])
    const [listBook, setListBooks] = useState([])

    useEffect(() => {
        axios
        .get(`https://6361bcc9fabb6460d8fe204f.mockapi.io/sach`)
        .then((res) => {
            const data = res.data;
            setListBooks(data);
        });

        fetch(
            `https://6361bcc9fabb6460d8fe204f.mockapi.io/quanlymuontra/` + params.iddonmuon
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setDonmuon(data);
                setTensach(data.tensach)
                setHinhanh(data.hinhanh)
                setTiensach(data.giatien)
                setIdsach(data.idsach)

                if (data.tinhtrangdon == "Trễ Hạn") {
                    let date = new Date
                    let date2 = new Date(data.ngayhentra)

                    let ms2 = date.getTime();
                    let ms1 = date2.getTime();
                    let tientrehen = 3000 * (Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000)))
                    setTientre(tientrehen)
                }
                const result = add(new Date(data.ngayhentra), {
                    days: 5,
                })
                setGiahan(format((result), 'yyyy-MM-dd'))
            });
    }, []);

    const handleGiahan = () => {
        fetch(`https://6361bcc9fabb6460d8fe204f.mockapi.io/quanlymuontra/` + params.iddonmuon, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify({
                ngayhentra: giahan,
                giahan: true
            }),
        })
            .then(function (res) {
                return res.json();
            })
            .then(function () {
                swal("Gia hạn thành công", "    ", "success");
                navigate('/quanlymuontra')
            });
    }

    const tinhtrangsach0 = (e) => {
        const tinhtrang = inputtinhtrangsach
        tinhtrang[0] = e.target.value
        setTinhtrangsach(tinhtrang)
    }

    const tinhtrangsach1 = (e) => {
        const tinhtrang = inputtinhtrangsach
        tinhtrang[1] = e.target.value
        setTinhtrangsach(tinhtrang)

    }

    const tinhtrangsach2 = (e) => {
        const tinhtrang = inputtinhtrangsach
        tinhtrang[2] = e.target.value
        setTinhtrangsach(tinhtrang)

    }

    const tinhtienphat = () => {
        let tienphat = + tientre

        for (let i = 0; i < tiensach.length; i++) {
            if (inputtinhtrangsach[i] == "Thất Lạc, Hư Hại") {
                tienphat = tienphat + (tiensach[i] * 2)
            }
        }
        setSotienphat(tienphat)
    }
    const hoantat = () => {
        swal({
            title: "Are you sure?",
            text: `Are you sure the fine is ${new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(sotienphat)} ?`,
            icon: "info",
            dangerMode: false,
        })
            .then(willDelete => {
                if (willDelete) {
                    swal("Done!", "Hoàn Tất!", "success");
                    fetch(`https://6361bcc9fabb6460d8fe204f.mockapi.io/quanlymuontra/` + params.iddonmuon, {
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        method: "PUT",
                        body: JSON.stringify({
                            tinhtrangdon: "Đã Hoàn Tất",
                            tinhtrangsachtra:inputtinhtrangsach ,
                            ngaytrasach: format(new Date(), 'yyyy-MM-dd'),
                            tienphat: sotienphat
                        }),
                    })
                        .then(function (res) {
                            return res.json();
                        })
                        .then(function () {
                            
                        });
                        fetch( `https://6361bcc9fabb6460d8fe204f.mockapi.io/docgia/` + donmuon.iddocgia, {
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        method: "PUT",
                        body: JSON.stringify({
                            trangthai: "chưa có đơn mượn"
                        }),
                    })
                        .then(function (res) {
                            return res.json();
                        })
                        .then(function () {
                            
                        });
                    
                        const sach = []
                        for(let i = 0 ; i< idsach.length; i++) {
                            if(inputtinhtrangsach[i] != "Thất Lạc, Hư Hại"){
                                sach.push( listBook.filter(item => item.id == idsach[i]))
                            }
                        }
                        for(let a = 0 ; a < sach.length; a++){
                            fetch("https://6361bcc9fabb6460d8fe204f.mockapi.io/sach/" + sach[a][0].id, {
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                },
                                method: "PUT",
                                body: JSON.stringify({
                                  soluong: sach[a][0].soluong + 1
                                }),
                            })
                                .then(function (res) {
                                    return res.json();
                                })
                                .then(function () {
                                 
                                });
                        }
                }
                navigate('/quanlymuontra')
            });

    }
    const thoat = () => {
        navigate('/quanlymuontra')
    }
    const trasach = () => {
        setView(!view)
    }

    return (
        <div>
            {!view ? (<div className='form-chi-tiet-don-muon'>
                <h2 className='header-chitiet-donmuon'>Chi Tiết Đơn</h2>
                <div className='info-donmuon'>
                    <div className='info-donmuon-left'>
                        <span className='span-info-chitietmuontra'>  Id Đơn Mượn: <p className='info-chitietmuontra'>{donmuon.iddonmuon}</p></span>
                        <span className='span-info-chitietmuontra'>  Họ Tên: <p className='info-chitietmuontra'>{donmuon.hotendocgia}</p></span>
                        {donmuon.tinhtrangdon !== "Đã Hoàn Tất" ? (<span className='span-info-chitietmuontra'>  Ngày Hẹn Trả: 
                        <p className='info-chitietmuontra'>{donmuon.ngayhentra}</p></span>) : 
                        (<span className='span-info-chitietmuontra'>  Ngày Trả: <p className='info-chitietmuontra'>{donmuon.ngaytrasach}</p></span>)

                        } {donmuon.tinhtrangdon == "Đã Hoàn Tất" ? (<span className='span-info-chitietmuontra'> Số tiền phạt: 
                        <p className='info-chitietmuontra'>{new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        }).format(donmuon.tienphat)}</p></span>) : ("")

                        }

                    </div>
                    <div className='info-donmuon-right'>
                        <span className='span-info-chitietmuontra'>  Id Đọc Giả: <p className='info-chitietmuontra'>{donmuon.iddocgia}</p></span>
                        <span className='span-info-chitietmuontra'>  Ngày Mượn: <p className='info-chitietmuontra'>{donmuon.ngaymuon}</p></span>
                        <span className='span-info-chitietmuontra'>  Trạng Thái: <p className='info-chitietmuontra'>{donmuon.tinhtrangdon}</p></span>
                    </div>
                </div>
                <div className='list-img-chitietmuontra'>
                    <div className='info-img'>
                        <p className='name-img'>{tensach[0]}</p>
                        <img src={hinhanh[0]} className="img-chitietmuontra"></img>
                        {
                            donmuon.tinhtrangdon == "Đã Hoàn Tất"  && donmuon.tinhtrangsachtra[0] != null ? ( <span className='span-info-tinhtrang'>  
                            Tình Trạng Sách:  <p className='info-chitietmuontra'>{donmuon.tinhtrangsachtra[0]}</p></span>) : ("")
                        }
                    </div>
                    <div className='info-img'>
                        <p className='name-img'>{tensach[1]}</p>
                        <img src={hinhanh[1]} className="img-chitietmuontra"></img>
                        {
                            donmuon.tinhtrangdon == "Đã Hoàn Tất"  && donmuon.tinhtrangsachtra[1] != null ?  ( <span className='span-info-tinhtrang'>   Tình Trạng Sách:
                            <p className='info-chitietmuontra'>{donmuon.tinhtrangsachtra[1]}</p></span>) : ("")
                        }
                    </div>
                    <div className='info-img'>
                        <p className='name-img'>{tensach[2]}</p>
                        <img src={hinhanh[2]} className="img-chitietmuontra"></img>
                        {
                            donmuon.tinhtrangdon == "Đã Hoàn Tất" && donmuon.tinhtrangsachtra[2] != null ? ( <span className='span-tinhtrang-chitietmuontra'>   Tình Trạng Sách:
                            <p className='info-chitietmuontra'>{donmuon.tinhtrangsachtra[2]}</p></span>) : ("")
                        }
                    </div>
                </div>
                {donmuon.tinhtrangdon !== "Đã Hoàn Tất" ? (<span className='span-ghichu-chitietmuontra'>
                     <p className='tranghthai'>Ghi Chú:</p> <p className='ghichu-chitietmuontra'>{donmuon.ghichu}</p></span>)
                    : ("")

                }
                <div className='button-chitietmuontra'>
                    <Button onClick={thoat} className=''> Thoát </Button>
                    {
                        donmuon.giahan == false && donmuon.tinhtrangdon =="đang mượn" ? (<Button color='info' className='info-button-trasach'
                         onClick={() => handleGiahan(donmuon.iddonmuon)}>Gia hạn</Button>) : ("")
                    }
                    {donmuon.tinhtrangdon !== "Đã Hoàn Tất" ? (<Button color='success' onClick={trasach} className='button-right'> Trả Sách </Button>) : ("")

                    }

                </div>
            </div>) : (<div className='form-chi-tiet-don-tra'>
                <h2 className='header-chitiet-donmuon'>Trả Sách</h2>

                <div className='main-chitiet-dontra'>
                    <div className='danh-sach-sach-tra'>
                        <span className='span-sach-tra'>
                            <p className='ten-sach-tra'>{tensach[0]}  <select onChange={tinhtrangsach0} className='tinh-trang-sach-tra'>

                                <option>Bình Thường</option>
                                <option>Thất Lạc, Hư Hại</option>
                            </select>
                            </p>
                        </span>
                        {
                            !tensach[1] == "" ? (<span className='span-sach-tra'>
                                <p className='ten-sach-tra'>{tensach[1]}  <select onChange={tinhtrangsach1} className='tinh-trang-sach-tra'>

                                    <option>Bình Thường</option>
                                    <option>Thất Lạc, Hư Hại</option>
                                </select>
                                </p>
                            </span>) : ("")
                        }
                        {
                            !tensach[2] == "" ? (<span className='span-sach-tra'>
                                <p className='ten-sach-tra'>{tensach[2]}  <select onChange={tinhtrangsach2} className='tinh-trang-sach-tra'>


                                    <option>Bình Thường</option>
                                    <option>Thất Lạc, Hư Hại</option>
                                </select>
                                </p>
                            </span>) : ("")
                        }
                    </div>
                    <div className='tong-tien'>
                        <p >Số Tiền Phạt: </p> <p className='tienphat-trai'>{new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        }).format(sotienphat)}</p>
                    </div>
                </div>
                <div className='button-chitiet-muontra'>
                    <Button onClick={trasach} className=''> Thoát </Button>

                    <Button color="warning" onClick={tinhtienphat} className=''> Tổng Tiền Phạt</Button>

                    <Button color='success' onClick={hoantat} className=''> Hoàn Tất</Button>
                </div>
            </div>)}

        </div>
    )
}

export default Chitietmuontra