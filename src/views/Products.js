import React, { useState, useEffect, Fragment } from "react";

//Libreries:
import Swal from "sweetalert2";

//Componets:
import Table from "../componets/Table";
import { Spinner } from "react-activity";
import "react-activity/dist/react-activity.css";
import FrmProduct from "../componets/Products/FrmProduct";
import ReactTooltip from "react-tooltip";

//Functions:
import { GetProducts, DeleteProduct } from "../http/Products";

let numeral = require("numeral");

const Products = (pros) => {
  const [Products, SetProducts] = useState([]);
  const [Filter, setFilter] = useState([]);
  const [ProductEditId, SetProductId] = useState(0);
  const [OpenModal, SetOpenModal] = useState(false);
  const [IsLoanding, SetLoanding] = useState(true);
  const [FrmEdit, SetFrmEdit] = useState(false);

  useEffect(() => {
    ProductsList();
  }, [OpenModal]);

  async function ProductsList() {
    let { data } = await GetProducts();
    SetProducts(data.Data);
    setFilter(data.Data);
    setTimeout(() => {
      SetLoanding(false);
    }, 2000);
  }
  async function SetDeleteProduct(Product) {
    Swal.fire({
      title: `Eliminar Producto`,
      text: `¿Quieres eliminar el producto ${Product.Name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminalo",
    }).then(async (result) => {
      if (result.value) {
        try {
          let DataResult = await DeleteProduct(Product.Id);
          if (DataResult.status === 200) {
            Swal.fire({
              title: "Eliminar Producto",
              text: "El Producto fue elimnado correctamente",
              icon: "success",
            });
            await ProductsList();
          } else {
            Swal.fire({
              title: "Eliminar Producto",
              text: "Ha ocurrido un error inesperado",
              icon: "error",
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
  async function EditProduct(ProductId) {
    SetProductId(ProductId);
    SetFrmEdit(true);
    SetOpenModal(true);
  }

  async function FilterProducts(ProductName) {
    let products = Products.filter((x) => x.Name.includes(ProductName));
    setFilter(products);
  }

  function SetTable() {
    if (IsLoanding) {
      return (
        <div className="container" style={{ width: "5%" }}>
          <Spinner color="#727981" size={32} speed={1} animating={true} />
        </div>
      );
    } else {
      if (Filter.length === 0) {
        return <p className="text-center">No hay registros para mostrar</p>;
      } else {
        return (
          <div>
            <Table
              Titles={[
                "Nombre",
                "Codigo",
                "Precio",
                "Costo",
                "Stock",
                "Proveedor",
                "Acciones",
              ]}
              Body={Filter.map((item, index) => (
                <tr key={index}>
                  <th>{item.Name}</th>
                  <th>{item.Code}</th>
                  <th>${numeral(item.Price).format(0, 0)}</th>
                  <th>${numeral(item.Cost).format(0, 0)}</th>
                  <th>{item.Stock}</th>
                  <th>{item.Provider}</th>
                  <th>
                    <button
                      data-tip="Editar el producto"
                      className="btn btn-secondary"
                      onClick={() => EditProduct(item.Id)}
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button
                      data-tip="Eliminar el producto"
                      className="btn btn-danger"
                      onClick={() =>
                        SetDeleteProduct({ Name: item.Name, Id: item.Id })
                      }
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </th>
                </tr>
              ))}
            />
            <ReactTooltip />
          </div>
        );
      }
    }
  }
  return (
    <Fragment>
      <div className="container">
        <h2 className="text-center">
          <i class="fas fa-warehouse"></i> Listado de Productos
        </h2>
        <div className="row">
          <div className="col-md-9">
            <label>Buscar productos</label>
            <input
              type="text"
              className="form-control"
              style={{ width: "50%" }}
              placeholder="Buscar por Nombre"
              onChange={(e) => FilterProducts(e.target.value)}
            ></input>
          </div>
          <div className="col-md-3">
            <br />
            <button
              className="btn btn-primary"
              onClick={() => SetOpenModal(true)}
              style={{ position: "relative" }}
            >
              <i className="fas fa-plus"></i> Nuevo Producto
            </button>
          </div>
        </div>
        <br />
        <div className="card">
          <div className="card-body">{SetTable()}</div>
        </div>
      </div>
        <FrmProduct
          IsEdit={FrmEdit}
          ProductId={ProductEditId}
          SetOpenModal={SetOpenModal}
          open={OpenModal}
          onclose={() => SetOpenModal(false)}
        ></FrmProduct>
    </Fragment>
  );
};

export default Products;
