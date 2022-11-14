import React from 'react'
import { useState, useEffect, useContext } from "react";
import { Link, useSearchParams, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, Row } from "reactstrap";
import swal from 'sweetalert'
import "../Css/qlmuontra.css"
import { useParams } from "react-router-dom";
import Multiselect from 'multiselect-react-dropdown'
import { compareAsc, format, add } from 'date-fns'

const Quanlymuontra = () => {
    const dateFormat = format(new Date(), "dd/MM/yyyy")
    const [listBooks, setListBooks] = useState([]);
    const [reader, setReader] = useState([])
    const [selectMulti, setSelectMulti] = useState([]);
    const [newListBooks, setNewListBooks] = useState([]);
    const [img, setImg] = useState([]);
    const [items, setItems] = useState();
    const [today, setToday] = useState();
    const [hentra, setHenTra] = useState()
    const [qlmuontra, setQuanlymuontra] = useState([])
    const [inputtinhtrangmuon, setInputTinhtrangmuon] = useState()
    const [isCreated, setIsCreate] = useState(true)
    const [soluong, setSoluong] = useState()
    const [search, setSearch] = useState()
    const [giatien, setGiatien] = useState([])
    const [listidsach, setListidsach] = useState()
    const [firstListreader, setFirstListReader] = useState([])
    const [dangmuon,setDangmuon]  =useState([])
    const [trehen,setTrehen]  =useState([])
    const [chuaco,setChuaco]  =useState([])

    useEffect(() => {
        if (search == null) {
            axios
                .get(`https://6361bcc9fabb6460d8fe204f.mockapi.io/quanlymuontra`)
                .then((res) => {
                    const data = res.data;
                    setQuanlymuontra(data);
                    setFirstListReader(data)

                    setDangmuon( data.filter((item) => item.tinhtrangdon == "đang mượn")) 
                    setTrehen( data.filter((item) => item.tinhtrangdon == "Trễ Hạn")) 
                    setChuaco( data.filter((item) => item.tinhtrangdon == "Đã Hoàn Tất")) 
                  
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].tinhtrangdon == "đang mượn" && new Date(data[i].ngayhentra) < new Date()) {

                            fetch("https://6361bcc9fabb6460d8fe204f.mockapi.io/quanlymuontra/" + data[i].iddonmuon, {
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                },
                                method: "PUT",
                                body: JSON.stringify({
                                    tinhtrangdon: "Trễ Hạn"
                                }),
                            })
                                .then(function (res) {
                                    return res.json();
                                })
                                .then(function () {
                                    setIsCreate(!isCreated);
                                });

                                fetch( `https://6361bcc9fabb6460d8fe204f.mockapi.io/docgia/` + data[i].iddocgia, {
                                    headers: {
                                        Accept: "application/json",
                                        "Content-Type": "application/json",
                                    },
                                    method: "PUT",
                                    body: JSON.stringify({
                                        trangthai: "Trễ Hạn"
                                    }),
                                })
                                    .then(function (res) {
                                        return res.json();
                                    })
                                    .then(function () {
                                    });
                        }
                    }


                });
        } else {
            axios
                .get(`https://6361bcc9fabb6460d8fe204f.mockapi.io/quanlymuontra?search=${search}`)
                .then((res) => {
                    const data = res.data;
                    setQuanlymuontra(data);
                });
        }

    }, [isCreated, search]);

    useEffect(() => {
        setToday(format(new Date(), 'yyyy-MM-dd'))

        const result = add(new Date(), {
            days: 15,
        })

        setHenTra(format((result), 'yyyy-MM-dd'))


        const item = JSON.parse(localStorage.getItem('iddocgia'));
        if (item) {
            setItems(item);
        }
        fetch(
            `https://6361bcc9fabb6460d8fe204f.mockapi.io/docgia/` + item
        )
            .then((response) => {
                return response.json();
            })

            .then((data) => {
                setReader(data);

            });

        axios
            .get(`https://6361bcc9fabb6460d8fe204f.mockapi.io/sach`)
            .then((res) => {
                const data = res.data;
                
                const newdatalist = data.filter((item) => item.soluong != 0)
                setListBooks(data);
                const newData = []

                for (let i = 0; i < newdatalist.length; i++) {
                    newData.push(newdatalist[i].tensach)
                }

                setNewListBooks(newData)
            
            });
    }, [isCreated]);

    const handleThemdon = () => {
        if (selectMulti == "") {
            swal("Oops!", "Chưa chọn sách mượn !", "error")
        } else {

            fetch("https://6361bcc9fabb6460d8fe204f.mockapi.io/quanlymuontra", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    iddocgia: reader.iddocgia,
                    ngaymuon: today,
                    ngayhentra: hentra,
                    ghichu: inputtinhtrangmuon,
                    hotendocgia: reader.ten,
                    tensach: selectMulti,
                    tinhtrangdon: 'đang mượn',
                    hinhanh: img,
                    giatien: giatien,
                    idsach: listidsach
                }),
            })
                .then(function (res) {
                    return res.json();
                })
                .then(function () {
                    setIsCreate(!isCreated);
                });
            swal("Thêm thành công", "    ", "success");

            fetch("https://6361bcc9fabb6460d8fe204f.mockapi.io/docgia/" + reader.iddocgia, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify({
                    trangthai: 'Đang Mượn'

                }),
            })
                .then(function (res) {
                    return res.json();
                })
                .then(function () {

                });
            for (let i = 0; i < soluong.length; i++) {
                fetch("https://6361bcc9fabb6460d8fe204f.mockapi.io/sach/" + soluong[i].id, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    method: "PUT",
                    body: JSON.stringify({
                        soluong: soluong[i].soluong - 1
                    }),
                })
                    .then(function (res) {
                        return res.json();
                    })
                    .then(function () {
                    });
            }
            localStorage.removeItem("iddocgia")
            setItems('')
        }

    }
    const loadSach = (item) => {
        const listReaders = firstListreader.filter((data) => data.tinhtrangdon == item);

        
        setQuanlymuontra([...listReaders]);
    }
    const loadlaidanhsach = () => {
        setQuanlymuontra(firstListreader)
    }
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    const handleThoat = () => {
        setItems("")
    }

    const tinhtrangmuon = (e) => {
        setInputTinhtrangmuon(e.target.value)
        console.log(e.target.value)
    }

    return (
        <div>
            <div className="search-form">
                <div className="search-span">
                    Tìm kiếm <input className="input-search" type="text" onChange={handleSearch} />
                </div>
            </div>
            {
                !items ? ("") : (<div>
                     
                    <div className='form-add-form-qlmuontra'>
                    <h2 className='header-qlmuontra'>Lập Phiếu Mượn</h2>
                    <div className='inputdata-form-qlmuontra'>
                        <div className='input-left-form-qlmuontra'>
                            <span className='span-input-form-qlmuontra'>Id đọc giả <input className='input-text-add-form-qlmuontra' type="text" value={reader.iddocgia} ></input></span>
                            <Multiselect
                                isObject={false}
                                onRemove={function noRefCheck(e) {
                                    setSelectMulti(e)
                                    const danhsach = []
                                    for (let i = 0; i < selectMulti.length; i++) {
                                        danhsach.push(listBooks.filter(item => item.tensach == selectMulti[i]))
                                    }
                                    let listImg = []
                                    let newsoluong = []
                                    let giatien = []
                                    let idsach = []
                                    for (let i = 0; i < danhsach.length; i++) {
                                        giatien.push(danhsach[i][0].dongia)
                                        listImg.push(danhsach[i][0].hinhanh)
                                        idsach.push(danhsach[i][0].id)
                                        newsoluong.push({ id: danhsach[i][0].id, soluong: danhsach[i][0].soluong })
                                    }
                                    setGiatien(giatien)
                                    setListidsach(idsach)
                                    setImg(listImg)
                                    setSoluong(newsoluong)
                                }}
                                onSearch={function noRefCheck() {

                                }}
                                onSelect={function noRefCheck(e) {
                                    setSelectMulti(e)
                                    const danhsach = []
                                    for (let i = 0; i < selectMulti.length; i++) {
                                        danhsach.push(listBooks.filter(item => item.tensach == selectMulti[i]))
                                    }
                                    let listImg = []
                                    let newsoluong = []
                                    let giatien = []
                                    let idsach = []
                                    for (let i = 0; i < danhsach.length; i++) {
                                        giatien.push(danhsach[i][0].dongia)
                                        listImg.push(danhsach[i][0].hinhanh)
                                        idsach.push(danhsach[i][0].id)
                                        newsoluong.push({ id: danhsach[i][0].id, soluong: danhsach[i][0].soluong })
                                    }
                                    setGiatien(giatien)
                                    setListidsach(idsach)
                                    setImg(listImg)
                                    setSoluong(newsoluong)
                                }}
                                selectionLimit={3}
                                options={newListBooks}
                                showCheckbox
                                placeholder="Chọn Sách"
                                style={{
                                    chips: {
                                        background: ' rgb(121, 203, 168)',
                                        color: 'black',
                                        height: '32px',
                                        'font-size': '25px'
                                    },
                                    multiselectContainer: {
                                        color: 'black',
                                        'font-family': 'Roboto Condensed',
                                        background: ''
                                    },
                                    searchBox: {
                                        border: 'none',
                                        'border-bottom': '1px solid  rgb(40, 150, 103)',
                                        'border-radius': '3px',
                                    }
                                }}
                            />

                            <span className='span-input-form-qlmuontra'>Ngày Mượn <input className='input-text-add-form-qlmuontra' value={today} type="date"></input></span>

                        </div>
                        <div className='input-right-form-qlmuontra'>
                            <span className='span-input-form-qlmuontra'>  Họ Tên <input className='input-text-add-form-qlmuontra' type="text" value={reader.ten} ></input></span>
                            <div className='img-input'>
                                <span className='span-hinhanh'> Hình Ảnh</span>

                                <div className='list-img' >
                                    <img className='img-sach-da-chon' src={img[0]}></img>
                                    <img className='img-sach-da-chon' src={img[1]}></img>
                                    <img className='img-sach-da-chon' src={img[2]}></img>
                                </div>
                            </div>
                            <span className='span-input-form-qlmuontra'>Ngày Hẹn Trả <input className='input-text-add-form-qlmuontra' value={hentra} type="date"></input></span>
                        </div>
                    </div>
                    <span className=' area-input'> Ghi Chú <textarea onChange={tinhtrangmuon} value={inputtinhtrangmuon} className='text-area-input' /></span>
                    <div className='button-form-qlmuontra'>
                        <Button color="secondary" className='button-thoat-ql' onClick={handleThoat} > Thoát </Button>
                        <Button className='button-them-ql' color="success" onClick={handleThemdon}>Lưu Mới</Button>
                    </div>
                </div>
                </div>)
            }
            <div className='main-docgia'>
             <div className='form-quanly-docgia'>
                    <div className='item-quanly-docgia tong'onClick={loadlaidanhsach} >
                        <p className='p-item-quanly'>Tổng Số Đơn: {firstListreader.length}</p>
                    </div>
                    <div className='item-quanly-docgia green' onClick={()=>loadSach('đang mượn')}>
                        <p className='p-item-quanly'> Đang Mượn: {dangmuon.length}</p>
                    </div>
                    <div className='item-quanly-docgia red' onClick={()=>loadSach('Trễ Hạn')}>
                        <p className='p-item-quanly'>Trễ Hẹn: {trehen.length}</p>
                    </div>
                    <div className='item-quanly-docgia gray' onClick={()=>loadSach('Đã Hoàn Tất')}>
                        <p className='p-item-quanly'>Hoàn Tất: {chuaco.length}</p>
                    </div>
                </div>
            <table className="table table-success table-bordered table-striped table-form-qlmuon">
                <thead>
                    <tr className='tr-table'>
                        <th scope="col">Id Đơn</th>
                        <th scope="col">Id Đọc Giả</th>
                        <th scope="col">Họ Tên</th>
                        <th scope="col">Ngày Mượn</th>
                        <th scope="col">Ngày Hẹn Trả</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {qlmuontra.map((item) => {
                        return (
                            <tr className='tr-table' >
                                <th scope="row">{item.iddonmuon}
                                </th>
                                <td> {item.iddocgia}</td>
                                <td>{item.hotendocgia}</td>
                                <td>{item.ngaymuon}</td>
                                <td> {item.ngayhentra}</td>
                                <td>
                                    <Link className='link-index' to={`/chitietdonmuon/${item.iddonmuon}`}> <Button color="info" >
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

export default Quanlymuontra