import React, { useState } from 'react';


//Componets
import Card from '../componets/Card';
const Dashboard= ({history})=>{

    const [TotalOfProducts, setTotalOfProducts]= useState(5);
    const [warehouseValue, setwarehouseValue]= useState('12,300');
    const [warehouseMovements, setwarehouseMovements]= useState([3,4]);
    
    return (
        <div className="container">
            <h2 className="text-center">Panel de Inicio</h2>

            <h3>Resumén general</h3>
            <div className="row">
                <div className="col-md-4">
                    <Card
                    title= "Total de Productos"
                    value= {TotalOfProducts}
                    action= {()=> history.push('/Products')}
                    color= {[39, 128, 227]}
                    icon= 'fas fa-warehouse'
                    />
                </div>
                <div className="col-md-4">
                    <Card
                    title= "Valor del Almacen"
                    value= {`$${warehouseValue}`}
                    action= {()=> history.push('/Products')}
                    color= {[40, 167, 69]}
                    icon= 'far fa-money-bill-alt'
                    />
                </div>
                <div className="col-md-4">
                    <Card
                    title= "Movimientos de Almacen"
                    action= {()=> history.push('/Products')}
                    color= {[255, 193, 7]}
                    icon= 'fas fa-exchange-alt'
                    value= {`↑ ${warehouseMovements[0]} ↓ ${warehouseMovements[1]}`}
                    />
                </div>
            </div>
        </div>
    )

}

export default Dashboard;