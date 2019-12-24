import http from './http';


export async function GetProducts(){
    return await http.get('/Products?_order=desc');
}