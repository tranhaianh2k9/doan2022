import React from 'react'
import { useState, useEffect, useContext } from "react";
import { Link, useSearchParams , useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form,FormGroup,Label,Input, Row } from "reactstrap";
import swal from 'sweetalert'
import "../Css/qlloai.css";

const Quanlyloai = () => {
 
    const [datainputId, setDataInputId] = useState('')
    const [datainputten, setDataInputTen]= useState('')

    const navigate = useNavigate()

    const [isCreated,setIsCreate] = useState(true)
    const [formName, setFormName] = useState('')
    const [add, setAdd] = useState(false)
    const [search, setSearch] = useState()
    const [loadLoaisach, setLoadLoaisach] = useState([])

    useEffect(() => {
        if (search == null) {
            axios
            .get(`https://6361bcc9fabb6460d8fe204f.mockapi.io/loaisach`)
            .then((res) => {
                const data = res.data;
                setLoadLoaisach(data);
            });

        } else {
            axios
                .get(`https://6361bcc9fabb6460d8fe204f.mockapi.io/loaisach?search=${search}`)
                .then((res) => {
                    const data = res.data;
                    setLoadLoaisach(data);
                });
        }
    }, [isCreated , search]);

    function clearInput (){
        setDataInputId("")
        setDataInputTen("")
 
    }

    const inputTensach = (e) =>{
        setDataInputTen(e.target.value)
    }

    function checkInvalid (string){
        let invalid = true
        for (let i = 0 ; i <loadLoaisach.length; i++) {
            if(string.split(" ").join("").toLowerCase()=== loadLoaisach[i].tenloaisach.split(" ").join("").toLowerCase())
            {
                invalid = false
                break;
            }
        }

        return invalid
    }

    
    function checkInvalidEdit (string , id){
        let invalid = true
        const danhsach = loadLoaisach.filter(iteam => iteam.idloaisach !== id)

        for (let i = 0 ; i <danhsach.length; i++) {
            if(string.split(" ").join("").toLowerCase()=== danhsach[i].tenloaisach.split(" ").join("").toLowerCase())
            {
                invalid = false
                break;
            }
           
        }

        return invalid
    }
    
    const handleThemsach = () =>{
        if  (checkInvalid(datainputten) ==false){
            swal("Oops!", "Tên danh mục đã tồn tại !", "error")
        } else if (datainputten=== ""){
            swal("Oops!", "Tên danh k được để trống !", "error")
        }
        else{

            const newLoai = {
                tenloaisach : datainputten,
               }
               
       fetch("https://6361bcc9fabb6460d8fe204f.mockapi.io/loaisach", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newLoai),
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
        const loai = [...loadLoaisach];
        const index = loai.findIndex((item) => {
      return item.idloaisach=== id


    });
        setDataInputId(loai[index].idloaisach)
        setDataInputTen(loai[index].tenloaisach)
       
    };

    const handleEditSave = ()=>{

       if (checkInvalidEdit(datainputten,datainputId) ==false){
            swal("Oops!", "Tên loại sách đã tồn tại !", "error")
        }
        else if (datainputten=== ""){
            swal("Oops!", "Tên danh k được để trống !", "error")
        }else{
       
              fetch("https://6361bcc9fabb6460d8fe204f.mockapi.io/loaisach/" + datainputId , {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify( {tenloaisach : datainputten,
                  
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

    const handleDeleteClick = (id) => {
        fetch(`https://6361bcc9fabb6460d8fe204f.mockapi.io/loaisach/` + id,
        {
        method: 'DELETE',
      })
      .then(res => res.text()) 
      swal({
        title: "Are you sure?",
        text: "Are you sure that you want to delete this category?",
        icon: "warning",
        dangerMode: true,
      })
      .then(willDelete => {
        if (willDelete) {
          swal("Deleted!", " has been deleted!", "success");
          navigate('/category')
          setIsCreate(!isCreated);
        }
      });

     }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    const handleOpenAdd = ()=>{
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
                {!add == true? (<button className='button-themmoi' onClick={handleOpenAdd}> Thêm mới </button>)
                :("")}
            </div>

            <div class= "main"> 
            <table className="table table-success table-bordered table-striped table-form-loai">
                <thead>
                    <tr className='tr-table'>
                        <th scope="col">id</th>
                        <th scope="col">Tên Loại Sách</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    { loadLoaisach.map((item) => {
                        return (
                            <tr className='tr-table' >
                                <th scope="row">{item.idloaisach}
                                </th>
                                <td> {item.tenloaisach}</td>
                                <td>
                                    { !add == true ? (<Button color="primary" className="btn-edit" onClick={()=>handleEditClick(item.idloaisach)}>
                                        Sửa
                                    </Button>) : ("")
                                    }
                                   <Button color="danger" onClick={()=>handleDeleteClick(item.idloaisach)}>
                                      Xóa
                                    </Button> 
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
            { add  == true  ? (
               <div className='form-add-form-loai'>
                     <h2 className='header-Them-form-loai'> {formName} </h2>
                
                        { formName ==='Edit' ? ( <span className='span-input-form-loai'> ID loại Sách  <input className='input-text-add-form-loai' type="number"  value={datainputId} disabled ></input></span>) :('')
    
                        }
                      <span className='span-input-form-loai'>  Loại Sách * <input className='input-text-add-form-loai' type="text" value={datainputten} onChange={inputTensach}></input></span>
                      
                       <div className='button-formadd-form-loai'> 
                       { formName === "Add New" ? (<Button className='button-them-form-loai' color="success" onClick={handleThemsach}>Lưu Mới</Button>)
                       :(<Button className='button-sua-form-loai' color="success" onClick={handleEditSave}>Sửa</Button>)
                       }  <Button color="secondary" className='button-thoat-form-loai' onClick={handleOpenAdd}> Thoát </Button> </div>

               </div>
            ) : ("")
            }
        
            </div>
        </div>
    )
}


export default Quanlyloai