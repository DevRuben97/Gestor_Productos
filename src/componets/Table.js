import React from 'react';


const Table= (props)=> {

    const {Titles}= props;
    const {Body}= props;
    return (
        <table className="table table-hover">
            <thead className="TableHead">
                <tr>
                {Titles.map((title,index)=> (
                    <th key= {index}>{title}</th>    
                ))}
                </tr>
            </thead>
            <tbody>
                {Body}
            </tbody>
        </table>
    )
}


export default Table;