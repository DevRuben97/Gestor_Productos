import http from './http';



export async function getMovements(){

    return await http.get('/Movements')
}

export async function getMovementTypes(){
    return await http.get('/Movement/Types');
}