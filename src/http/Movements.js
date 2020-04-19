import http from './http';




export async function getMovements(){

    return await http.get('/Movements')
}