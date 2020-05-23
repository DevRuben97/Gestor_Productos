import React,{Fragment, useEffect, useState} from 'react';

import numeral from 'numeral';

export default function MovementTotals({Details, setTotal}){

    const [SubTotal, setSubTotal]= useState(0);
    const [Taxes, setTaxes]= useState(0);
    const [Total, setTotals]= useState(0);

   useEffect(()=> {
    if (Details && Details.length>0){
        console.log(Details);
        let value= 0;
        Details.map((item)=> {
            value+= item.subTotal;
       })
       setSubTotal(value);
       setTaxes((value * 0.18));
       const total= value +(value * 0.18)
       setTotals(total);
       setTotal(total);
    }
    else{
        setSubTotal(0);
        setTaxes(0);
        setTotals(0);
        setTotal(0);
    }
   },[Details])

    return (
        <Fragment>
            <label>SubTotal: <strong> ${numeral(SubTotal).format(0,0)}</strong></label>
            <br/>
            <label>Impuestos: <strong>${numeral(Taxes).format(0,0)}</strong></label>
            <br/>
            <label>Total: <strong>${numeral(Total).format(0,0)}</strong></label>
        </Fragment>
    )
}