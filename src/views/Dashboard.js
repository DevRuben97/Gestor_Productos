import React, { useState, useEffect } from "react";
import BarChart from "../componets/Charts/BarChart";

//Componets
import Card from "../componets/Card";
const Dashboard = ({ history }) => {
  const [TotalOfProducts, setTotalOfProducts] = useState(5);
  const [warehouseValue, setwarehouseValue] = useState("12,300");
  const [warehouseMovements, setwarehouseMovements] = useState([3, 4]);
  const [WarehouseValueHistory, SetWarehouseValueHistory] = useState([
    {
      label: "Enero",
      value: 12700
    },
    {
      label: "Febrero",
      value: 15000
    },
    {
      label: "Marzo",
      value: 16200
    }
  ]);

  return (
    <div className="container">
      <h2 className="text-center"><i class="fas fa-tachometer-alt"></i> Panel de Inicio</h2>

      <h3>Resumén general</h3>
      <div className="row">
        <div className="col-md-4">
          <Card
            title="Total de Productos"
            value={TotalOfProducts}
            action={() => history.push("/Products")}
            color={[39, 128, 227]}
            icon="fas fa-warehouse"
          />
        </div>
        <div className="col-md-4">
          <Card
            title="Valor del Almacen"
            value={`$${warehouseValue}`}
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
            value={`↑ ${warehouseMovements[0]} ↓ ${warehouseMovements[1]}`}
          />
        </div>
      </div>
      <br/>
      <h2 className="text-center"><i class="fas fa-chart-bar"></i> Graficos Estadisticos</h2>
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
      </div>
    </div>
  );
};

export default Dashboard;
