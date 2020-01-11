import http from './http';


export async function login(values){
    return await http.post('/Auth/login',values);
}