import http from './http';


export async function GetProducts(){
    return await http.get('/Products');
}
export async function GetProductById(Id){
    return await http.get(`/Products/${Id}`);
}

export async function NewProduct(Data){
    return await http.post('/Products', Data);
}

export async function EditProduct(Data){
    return await http.put(`/Products/`, Data);
}

export async function DeleteProduct(id){
    return await http.delete(`/Products/${id}`)
}

export async function productsForSelect(){
    return await http.get('/Products/ForSelect/0');
}

export async function total_products(){
    return await http.get('/Products/ProductsCount/0');
}

export async function totalWarehouse(){
    return await http.get('Products/TotaltotalWarehouse/0');
}