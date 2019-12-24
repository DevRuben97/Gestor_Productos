import React,{useState,useEffect} from 'react';

//Functions:
import {GetProducts} from '../http/Products';

//Libreries:
import Swal from 'sweetalert2';
import Modal from 'react-responsive-modal';

//Componets:
import Table from '../componets/Table';

const Products= (pros)=>{


    const [Products, SetProducts]= useState([]);
    const [OpenModal, SetOpenModal]= useState(false);

    useEffect(()=>{
        ProductsList();
    },[])

    async function ProductsList(){

        let {data}= await GetProducts();

        SetProducts(data);
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
    async function EditProduct(){

    }
      function NewProduct(){
        SetOpenModal(true);
    }
    return (
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
                        <button className="btn btn-secondary">Editar</button>
                        <button className="btn btn-danger" onClick={()=> DeleteProduct({Name: item.Name, Id: item.Id})}>Eliminar</button>
                    </th>
                </tr>

            ))}
            />
            <Modal open= {OpenModal} onClose={()=> SetOpenModal(false)}>
                <div className="container">
                    <h2 className="text-center">Nuevo Producto</h2>
                </div>
            </Modal>
        </div>
    )
}

export default Products;