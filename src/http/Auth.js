import http from './http';


export async function login(values){
    return await http.post('/Auth/login',values);
}

export async function GetUserInfo(id){
    return await http.get(`/Auth/UserProfile/${id}`);
}