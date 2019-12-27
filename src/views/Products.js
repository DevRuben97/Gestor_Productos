import React,{useState,useEffect} from 'react';

//Functions:
import {GetProducts} from '../http/Products';

//Libreries:
import Swal from 'sweetalert2';
import Modal from 'react-responsive-modal';

//Componets:
import Table from '../componets/Table';
import Spinner from '../componets/Spinner';
import FrmProduct from '../componets/Products/FrmProduct';

const Products= (pros)=>{


    const [Products, SetProducts]= useState([]);
    const [OpenModal, SetOpenModal]= useState(false);
    const [IsLoanding, SetLoanding]= useState(true);
    const [FrmEdit, SetFrmEdit]= useState(false);

    useEffect(()=>{
        ProductsList();
    },[])

    async function ProductsList(){

        let {data}= await GetProducts();
        SetProducts(data);
        setTimeout(()=>{
            SetLoanding(false);
        },2000)
    }
    async function DeleteProduct(Product){
        Swal.fire({
            title: `Eliminar Producto`,
            text: `¿Quieres eliminar el producto ${Product.Name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminalo'
        }).then((result)=>{
            if (result.value){
                

                Swal.fire({
                    title: 'Eliminar Producto',
                    text: 'El Producto fue elimnado correctamente',
                    icon: 'success'
                })
            }
        })
    }
    async function EditProduct(ProductId){
        SetFrmEdit(true);
        SetOpenModal(true);
    }
      function NewProduct(){
        SetOpenModal(true);

    }

    function SetTable(){

        if (IsLoanding){
            return (<Spinner></Spinner>)
        }else{
            return (
                <Table 
                Titles={['Nombre', 'Codigo','Precio', 'Costo', 'Stock', 'Proveedor','Acciones']}
                Body={Products.map((item,index)=>(
                    <tr key={index}>
                        <th>{item.Name}</th>
                        <th>{item.Code}</th>
                        <th>${item.Price}</th>
                        <th>${item.Cost}</th>
                        <th>{item.Stock}</th>
                        <th>{item.Provider}</th>
                        <th>
                            <button className="btn btn-secondary" onClick={()=> EditProduct(item.Id)}>Editar</button>
                            <button className="btn btn-danger" onClick={()=> DeleteProduct({Name: item.Name, Id: item.Id})}>Eliminar</button>
                        </th>
                    </tr>
    
                ))}
                />
            )
        }
    }
    return (
        <div>
            <div className="container">
            <h2 className="text-center">Listado de Productos</h2>
            <div className="row">
                <div className="col-md-9">
                    <label>Buscar productos</label>
                    <input type="text" className="form-control" style={{width: '50%'}} placeholder="Buscar por Nombre"></input>
                </div>
                <div className="col-md-3">
                    <br/>
                    <button className="btn btn-primary" onClick={NewProduct} style={{position: 'relative'}}>Nuevo Producto</button>
                </div>
            </div>
            <br/>
            {SetTable()}
        </div>
        <Modal open= {OpenModal} onClose={()=> SetOpenModal(false)} center={true} classNames={{modal: 'ModalContenedor'}}>
                <FrmProduct IsEdit= {FrmEdit}></FrmProduct>
            </Modal>
        </div>
    )
}

export default Products;