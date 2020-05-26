import Swal from 'sweetalert2';


export function message(message,type){
    Swal.fire({
        text: message,
        icon: type!== undefined || type!== null? type: 'info'
    })
}

export async function question(message){
   return await Swal.fire({
        text: message,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Continuar",
        cancelButtonText: "Cancelar",
        icon: "question",
    });
}
