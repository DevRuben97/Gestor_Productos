import http from './http';


export async function GetProducts(){
    return await http.get('/Products?_order=desc');
}
export async function GetProductById(Id){
    return await http.get(`/Products/${Id}`);
}

export async function NewProduct(Data){
    return await http.post('/Products', Data);
}

export async function EditProduct(Data){
    return await http.put(`/Products/${Data.id}`, Data);
}

export async function DeleteProduct(id){
    return await http.delete(`/Products/${id}`)
}