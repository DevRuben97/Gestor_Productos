import React,{Fragment, useEffect, useState} from 'react';

import numeral from 'numeral';

export default function MovementTotals({Details}){

    const [SubTotal, setSubTotal]= useState(0);
   useEffect(()=> {
    if (Details && Details.length>0){
        console.log(Details);
       const value=  Details.reduce((a,b)=> a.SubTotal + b.SubTotal);
       setSubTotal(value);
    }
   },[Details])

    return (
        <Fragment>
            <label>SubTotal: <strong> ${numeral(SubTotal).format(0,0)}</strong></label>
        </Fragment>
    )
}