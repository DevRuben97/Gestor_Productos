import React,{Fragment, useEffect, useState} from 'react';

import numeral from 'numeral';

export default function MovementTotals({Details}){

    const [SubTotal, setSubTotal]= useState(0);
   useEffect(()=> {
    if (Details && Details.length>0){
        console.log(Details);
        let value= 0;
        Details.map((item)=> {
            value+= item.subTotal;
       })
       setSubTotal(value);
    }
    else{
        setSubTotal(0);
    }
   },[Details])

    return (
        <Fragment>
            <label>SubTotal: <strong> ${numeral(SubTotal).format(0,0)}</strong></label>
            <br/>
            <label>Impuestos: <strong>${(numeral((SubTotal * 0.18)).format(0,0))}</strong></label>
            <br/>
            <label>Total: <strong>${numeral(SubTotal + (SubTotal * 0.18)).format(0,0)}</strong></label>
        </Fragment>
    )
}