import http from './http';



export async function getMovements(){

    return await http.get('/Movements/')
}

export async function getMovementTypes(){
    return await http.get('/Movement/Types');
}

export async function newMovement(data){
    return await http.post('/Movement/', data);
}