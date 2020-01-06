import React, { useEffect } from 'react';
import Chart from 'chart.js'


export default function BarChart({Data, color,title}){


    let BarRef= React.createRef();

    useEffect(()=>{
        function CreateBar(){
            
             new Chart(BarRef.current, {
                type: 'bar',
                data: {
                    labels: Data.map(x=> x.label),
                    datasets: [{
                        label: title,
                        data: Data.map(x=> x.value),
                        backgroundColor: color
                    }]
                }
            })
        }
        CreateBar();
    })

    return (
        <canvas ref={BarRef}/>
    )
}