import * as yup from 'yup';


export const PRODUCT_SCHEMA= yup.object().shape({
    Name: yup.string().required('El nombre es requerido'),
    Price: yup.string().required('Introduce un precio'),
    Cost: yup.string().required('Introduce el costo del producto'),
    Category: yup.string().required('La categoria es requerido'),
    Provider: yup.string().required('El Proveedor es requerido')
})

export const USER_LOGIN_SCHEMA= yup.object().shape({
    Email: yup.string().email('Ingresa un correo electronico valido'),
    Password: yup.string().required('La contraseña es requerida')
})

export const MOVEMENT_SCHEME= yup.object().shape({
    Date: yup.string().nullable().required("La Fecha es requerida"),
    Invoice: yup.string().required("Introduce la Factura"),
    Type: yup.string().required("El Tipo es requerido"),
    Details: yup.array().min(1, "Es requerido como minimo un producto")
})