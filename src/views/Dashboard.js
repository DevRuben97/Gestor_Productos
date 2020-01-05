import React from 'react';


//Componets
import Card from '../componets/Card';
const Dashboard= ({history})=>{

    return (
        <div className="container">
            <h2 className="text-center">Panel de Inicio</h2>

            <h3>Resumén general</h3>
            <div className="row">
                <div className="col-md-3">
                    <Card
                    title= "Total de Productos"
                    value= {5}
                    action= {()=> history.push('/Products')}
                    color= {[39, 128, 227]}
                    icon= 'fas fa-warehouse'
                    />
                </div>
                <div className="col-md-3">
                    <Card
                    title= "Valor del Almacen"
                    value= {'$12,300'}
                    action= {()=> history.push('/Products')}
                    color= {[40, 167, 69]}
                    icon= 'far fa-money-bill-alt'
                    />
                </div>
            </div>
        </div>
    )

}

export default Dashboard;