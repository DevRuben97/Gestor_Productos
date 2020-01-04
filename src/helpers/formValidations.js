import * as yup from 'yup';


export const PRODUCT_SCHEMA= yup.object().shape({
    Name: yup.string().required('El nombre es requerido'),
    Price: yup.string().required('Introduce un precio'),
    Cost: yup.string().required('Introduce el costo del producto'),
    Category: yup.string().required('La categoria es requerido'),
    Provider: yup.string().required('El Proveedor es requerido')
})