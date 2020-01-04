import React,{useState,useEffect} from 'react';

//Functions:
import {GetProducts, DeleteProduct} from '../http/Products';

//Libreries:
import Swal from 'sweetalert2';
import Modal from 'react-responsive-modal';

//Componets:
import Table from '../componets/Table';
import {Spinner} from 'react-activity';
import 'react-activity/dist/react-activity.css';
import FrmProduct from '../componets/Products/FrmProduct';

let numeral= require('numeral');

const Products= (pros)=>{


    const [Products, SetProducts]= useState([]);
    const [Filter, setFilter]= useState([]);
    const [ProductEditId, SetProductId]= useState(0);
    const [OpenModal, SetOpenModal]= useState(false);
    const [IsLoanding, SetLoanding]= useState(true);
    const [FrmEdit, SetFrmEdit]= useState(false);

    useEffect(()=>{
        ProductsList();
    },[OpenModal])

    async function ProductsList(){

        let {data}= await GetProducts();
        SetProducts(data);
        setFilter(data);
        setTimeout(()=>{
            SetLoanding(false);
        },2000)
    }
    async function SetDeleteProduct(Product){
        Swal.fire({
            title: `Eliminar Producto`,
            text: `¿Quieres eliminar el producto ${Product.Name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminalo'
        }).then(async (result)=>{
            if (result.value){
                
            try {
               
              let DataResult= await DeleteProduct(Product.Id);
               if (DataResult.status=== 200){
                Swal.fire({
                    title: 'Eliminar Producto',
                    text: 'El Producto fue elimnado correctamente',
                    icon: 'success'
                })
                await ProductsList()
               }
               else{
                Swal.fire({
                    title: 'Eliminar Producto',
                    text: 'Ha ocurrido un error inesperado',
                    icon: 'error'
                })
               }
             
            } catch (error) {
                console.log(error);
            }    

            
            }
        })
    }
    async function EditProduct(ProductId){

        SetProductId(ProductId);
            SetFrmEdit(true);
            SetOpenModal(true);
    }

    async function FilterProducts(ProductName){
        let products = Products.filter(x=> x.Name.includes(ProductName));
        setFilter(products);
        
    }

    function SetTable(){

        if (IsLoanding){
            return (
                <div className="container" style={{width: '5%'}}>
                    <Spinner color="#727981" size={32} speed={1} animating={true} />
                </div>
            )
        }else{
            if (Filter.length===0){
                return (
                    <p className="text-center">No hay registros para mostrar</p>
                )
            }
            else{
                return (
                    <Table 
                Titles={['Nombre', 'Codigo','Precio', 'Costo', 'Stock', 'Proveedor','Acciones']}
                Body={Filter.map((item,index)=>(
                    <tr key={index}>
                        <th>{item.Name}</th>
                        <th>{item.Code}</th>
                        <th>${numeral(item.Price).format(0,0)}</th>
                        <th>${numeral(item.Cost).format(0,0)}</th>
                        <th>{item.Stock}</th>
                        <th>{item.Provider}</th>
                        <th>
                            <button className="btn btn-secondary" onClick={()=> EditProduct(item.id)}>Editar</button>
                            <button className="btn btn-danger" onClick={()=> SetDeleteProduct({Name: item.Name, Id: item.id})}>Eliminar</button>
                        </th>
                    </tr>
    
                ))}
                />
                )
            }
        }
    }
    return (
        <div>
            <div className="container">
            <h2 className="text-center">Listado de Productos</h2>
            <div className="row">
                <div className="col-md-9">
                    <label>Buscar productos</label>
                    <input type="text" className="form-control" style={{width: '50%'}} placeholder="Buscar por Nombre" onChange={(e)=> FilterProducts(e.target.value)}></input>
                </div>
                <div className="col-md-3">
                    <br/>
                    <button className="btn btn-primary" onClick={()=> SetOpenModal(true)} style={{position: 'relative'}}>Nuevo Producto</button>
                </div>
            </div>
            <br/>
            <div className="card">
                <div className="card-body">
                {SetTable()}
                </div>
            </div>
        </div>
        <Modal open= {OpenModal} onClose={()=> SetOpenModal(false)} center={true} classNames={{modal: 'ModalContenedor'}}>
                <FrmProduct IsEdit= {FrmEdit} ProductId= {ProductEditId} SetOpenModal={SetOpenModal}></FrmProduct>
            </Modal>
        </div>
    )
}

export default Products;