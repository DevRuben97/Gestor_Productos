import React, { useState, useEffect } from "react";
import BarChart from "../componets/Charts/BarChart";
import numeral from 'numeral';

//Componets
import Card from "../componets/Card";

//Http
import {
   total_products,
   totalWarehouse
   } from "../http/Products";

import {WareHouseMovements} from '../http/Movements'
const Dashboard = ({ history }) => {
  const [TotalOfProducts, setTotalOfProducts] = useState(null);
  const [warehouseValue, setwarehouseValue] = useState(null);
  const [warehouseMovements, setwarehouseMovements] = useState([]);
  const [WarehouseValueHistory, SetWarehouseValueHistory] = useState([
    {
      label: "Enero",
      value: 12700,
    },
    {
      label: "Febrero",
      value: 15000,
    },
    {
      label: "Marzo",
      value: 16200,
    },
  ]);

  //Total Products:
  useEffect(() => {
    async function Fetch() {
      const { data } = await total_products();
      setTotalOfProducts(data.Data);
    }
    Fetch();
  }, []);

  //Total Products:
  useEffect(() => {
    async function Fetch() {
      const { data } = await totalWarehouse();
      setwarehouseValue(data.Data);
    }
    Fetch();
  }, []);

  //WareHouse movements:
  useEffect(() => {
    async function Fetch() {
      const { data } = await WareHouseMovements();
      setwarehouseMovements(data.Data);
    }
    Fetch();
  }, []);

  return (
    <div className="container" style={{paddingTop: '30px'}}>
      <h2 className="text-center">
        <i class="fas fa-tachometer-alt"></i> Panel de Inicio
      </h2>
      <br/>
      <h3 style={{textAlign: 'center'}}>Resumén general</h3>
      <div className="row">
        <div className="col-md-4">
          <Card
            title="Total de Productos"
            value={TotalOfProducts}
            action={() => history.push("/Products")}
            color={[39, 128, 227]}
            icon="fas fa-warehouse"
            loading={true}
          />
        </div>
        <div className="col-md-4">
          <Card
            title="Valor del Almacen"
            value={warehouseValue!==null? `$${numeral(warehouseValue).format('0,0')}`: null}
            action={() => history.push("/Products")}
            color={[40, 167, 69]}
            icon="far fa-money-bill-alt"
          />
        </div>
        <div className="col-md-4">
          <Card
            title="Movimientos de Almacen"
            action={() => history.push("/Products")}
            color={[255, 193, 7]}
            icon="fas fa-exchange-alt"
            value={warehouseMovements.length>0? `↑ ${warehouseMovements[0]} ↓ ${warehouseMovements[1]}`: null}
          />
        </div>
      </div>
      <br />
     {/* <h2 className="text-center">
        <i class="fas fa-chart-bar"></i> Graficos Estadisticos
      </h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <BarChart
                title="valor del alamcen por meses"
                color="rgb(39, 128, 227)"
                Data={WarehouseValueHistory}
              />
            </div>
          </div>
        </div>
      </div>*/}
  </div>
  );
};

export default Dashboard;
