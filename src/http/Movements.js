import http from './http';



export async function getMovements(){

    return await http.get('/Movement/')
}

export async function getMovementTypes(){
    return await http.get('/Movement/Types');
}

export async function newMovement(data){
    return await http.post('/Movement/', data);
}

export async function getMovementById(id){
    return await http.get(`/Movement/${id}`);
}

export async function editMovement(data){
    return await http.put('/Movement',data);
}

export async function WareHouseMovements(){
    return await http.get('/Movement/WaraHouse/0')
}