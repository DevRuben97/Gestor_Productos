import React from "react";

export default function Card({ title, value, action, color, icon }) {
  return (
    <div className="card mb3 CardBoxAnimation" style={{color: 'white', backgroundColor: `rgb(${color})`}}  onClick={action} data-tip="Eliminar el producto">
      <div className="card-body">
        <div className="row">
            <div className="col-md-3" style={{fontSize: '40px'}}>
                <i className={icon}></i>
            </div>
            <div className="col">
            <h5>{title}</h5>
            <p  style={{fontWeight: 'bold', fontSize: '24px', marginBottom: '0'}}>{value}</p>
            </div>
        </div>
      </div>
        <div style={{textAlign: 'center'}}>
          <label>Click para mas información <i class="fas fa-arrow-right"></i></label>
        </div>
    </div>
  );
}
