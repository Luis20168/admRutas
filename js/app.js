
const fotoVehiculo = document.querySelector('#fotoVehiculo');
const nombreVehiculo = document.querySelector('#nombreVehiculo');
const marcaVehiculo = document.querySelector('#marcaVehiculo');
const cilindrajeVehiculo = document.querySelector('#cilindrajeVehiculo');
const placaVehiculo = document.querySelector('#placaVehiculo');
const soatVehiculo = document.querySelector('#soatVehiculo');
const consumoCombustible= document.querySelector('#consumoCombustible');
const descripcion= document.querySelector('#descripcion');




// Crear una instancia de Citas








//imagen 
const img= document.querySelector('.img')

//fin imagen
// Contenedor para las citas
const contenedorCitas = document.querySelector('#citas');

// Formulario nuevas citas
const formulario = document.querySelector('#nueva-cita')
formulario.addEventListener('submit', nuevaCita);

let editando = false;







// Eventos
eventListeners();
function eventListeners() {
    fotoVehiculo.addEventListener('change', (e)=>{
        const foto= e.target.files[0]

        if(foto){
            rutaObj[e.target.name] = e.target.files[0];
            mostrarFoto(foto);

        }
        else{
            console.log('No hay foto')
            img.src= './img/up.png'
        }

        
        
        

        
        
        
        


    } );
    nombreVehiculo.addEventListener('change', datosCita);
    marcaVehiculo.addEventListener('change', datosCita);
    cilindrajeVehiculo.addEventListener('change', datosCita);
    placaVehiculo.addEventListener('change', datosCita);
    soatVehiculo.addEventListener('change', datosCita);
    consumoCombustible.addEventListener('change', datosCita);
    descripcion.addEventListener('change', datosCita);

}

const rutaObj = {
    foto: '',
    nombre: '',
    marca: '',
    cilindraje: '',
    placa:'',
    soat: '',
    consumo: '',
    descrip: ''
}




function mostrarFoto(foto){
    
    console.log('hay')
    console.log(rutaObj)
    const reader = new FileReader();
    reader.onload= function(e){
        img.src= e.target.result;
        
    }
    reader.readAsDataURL(foto)
        

}
   



function datosCita(e) {
    //  console.log(e.target.name) // Obtener el Input
     rutaObj[e.target.name] = e.target.value;
     
}





// CLasses
 class Citas {
    constructor() {

        

        let local= JSON.parse(localStorage.getItem('rutas'))
        console.log(local) 
        this.citas =  local || [];
        // this.citas= [];


        

        
        
        
    }
    agregarCita(cita) {
        this.citas = [...this.citas, cita];
        this.agregarStorage();
        console.log(this.citas)
        
        
        
        
    }
    editarCita(citaActualizada) {
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita)
        this.agregarStorage();
        
        
    }

    eliminarCita(id) {
        this.citas = this.citas.filter( cita => cita.id !== id);
        this.agregarStorage();
        
        
    }

    agregarStorage() {
        localStorage.setItem('rutas', JSON.stringify(this.citas));
        
    }
    obtenerCitas() {
        return this.citas;
    }
    

    
    

    
    
}

















class UI {
    imprimirAlerta(mensaje, tipo) {
        // Crea el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
        
        // Si es de tipo error agrega una clase
        if(tipo === 'error') {
             divMensaje.classList.add('alert-danger');
        } else {
             divMensaje.classList.add('alert-success');
        }

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Insertar en el DOM
        document.querySelector('#contenido').insertBefore( divMensaje , document.querySelector('.agregar-cita'));

        // Quitar el alert despues de 3 segundos
        setTimeout( () => {
            divMensaje.remove();
        }, 3000);
   }

   imprimirCitas({citas}) { // Se puede aplicar destructuring desde la función...
    this.limpiarHTML();

        citas.forEach(cita => {
            const {foto ,nombre,  marca, cilindraje, placa, soat, consumo, descrip, id } = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // scRIPTING DE LOS ELEMENTOS...
            const fotoVehiculoimg = document.createElement('img');
            fotoVehiculoimg.classList.add('card-title', 'font-weight-bolder');
            fotoVehiculoimg.style.width= '200px'
           
            // if(foto){
            //     console.log(foto[0])
            //     const reader = new FileReader();
            //     reader.onload= (e) => fotoVehiculoimg.src= e.target.result
            //     reader.readAsDataURL(foto);

            // }
            // else{
            //     console.log('foto mala')
            // }

            
           
           

            const nombreVehiculoParrafo = document.createElement('p');
            nombreVehiculoParrafo.innerHTML = `<span class="font-weight-bolder">Nombre: </span> ${nombre}`;

            const  marcaVehiculoParrafo = document.createElement('p');
            marcaVehiculoParrafo.innerHTML = `<span class="font-weight-bolder">Marca: </span> ${ marca}`;

            const cilindrajeVehiculoParrafo = document.createElement('p');
            cilindrajeVehiculoParrafo.innerHTML = `<span class="font-weight-bolder">cilindrajeVehiculo: </span> ${cilindraje}`;

            const placaVehiculoParrafo = document.createElement('p');
            placaVehiculoParrafo.innerHTML = `<span class="font-weight-bolder">placaVehiculo: </span> ${placa}`;

            const soatVehiculoParrafo = document.createElement('p');
            soatVehiculoParrafo.innerHTML = `<span class="font-weight-bolder">Soat: </span> ${soat}`;
            const consumoCombustibleParrafo = document.createElement('p');
            consumoCombustibleParrafo.innerHTML = `<span class="font-weight-bolder">Consumo: </span> ${consumo}`;
            const descripcionParrafo = document.createElement('p');
            descripcionParrafo.innerHTML = `<span class="font-weight-bolder">Descripcion: </span> ${descrip}`;

            // Agregar un botón de eliminar...
            const btnEliminar = document.createElement('button');
            btnEliminar.onclick = () => eliminarCita(id); // añade la opción de eliminar
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

            // Añade un botón de editar...
            const btnEditar = document.createElement('button');
            btnEditar.onclick = () => cargarEdicion(cita);

            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'

            // Agregar al HTML
            divCita.appendChild(fotoVehiculoimg);
            divCita.appendChild(nombreVehiculoParrafo);
            divCita.appendChild(marcaVehiculoParrafo);
            divCita.appendChild(cilindrajeVehiculoParrafo);
            divCita.appendChild(placaVehiculoParrafo);
            divCita.appendChild(soatVehiculoParrafo);
            divCita.appendChild(consumoCombustibleParrafo);
            divCita.appendChild(descripcionParrafo);


            divCita.appendChild(btnEliminar)
            divCita.appendChild(btnEditar)

            contenedorCitas.appendChild(divCita);
        });  
        
       
   }

   limpiarHTML() {
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
   }
}

const ui = new UI();
let administrarCitas = new Citas();


//imprime informacion desde el local

document.addEventListener('DOMContentLoaded', ()=>{
    ui.imprimirCitas(administrarCitas)

    

});







function nuevaCita(e) {
    e.preventDefault();

    const {foto,nombre,  marca, cilindraje, placa, soat, consumo, descrip } = rutaObj;

    // Validar
    if(foto === '' ||nombre === '' ||  marca === '' || cilindraje=== ''  || placa === '' || soat === '' || consumo==='' || descrip==='' ) {
        ui.imprimirAlerta('Todos los mensajes son Obligatorios', 'error')

        return;
    }

    if(editando) {
        // Estamos editando
        administrarCitas.editarCita( {...rutaObj} );
        console.log(administrarCitas)

        ui.imprimirAlerta('Guardado Correctamente');

        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';
        

        editando = false;
        

    } else {
        // Nuevo Registrando

        // Generar un ID único
        rutaObj.id = Date.now();
        
        // Añade la nueva cita
        administrarCitas.agregarCita({...rutaObj});
        

        // Mostrar mensaje de que todo esta bien...
        ui.imprimirAlerta('Se agregó correctamente')
    }


    // Imprimir el HTML de citas
    ui.imprimirCitas(administrarCitas);
    

    // Reinicia el objeto para evitar futuros problemas de validación
    reiniciarObjeto();

    // Reiniciar Formulario
    //nueva funcion añadida se restea la img 
    reset();
    function reset(){
        formulario.reset();
        img.src= './img/up.png'
        

    }
    

}

function reiniciarObjeto() {
    // Reiniciar el objeto
    

    rutaObj.fotoVehiculo= '';
    rutaObj.nombreVehiculo= '';
    rutaObj.marcaVehiculo= '';
    rutaObj.cilindrajeVehiculo= '';
    rutaObj.placaVehiculo='';
    rutaObj.soatVehiculo= '';
    rutaObj.consumoCombustible= '';
    rutaObj.descripcion= '';


    
}


function eliminarCita(id) {
    administrarCitas.eliminarCita(id);

    ui.imprimirCitas(administrarCitas)
}

function cargarEdicion(cita) {

    const {foto,nombre,  marca, cilindraje, placa, soat, consumo, descrip, id } = cita;

    // Reiniciar el objeto
    rutaObj.fotoVehiculo= foto;
    rutaObj.nombreVehiculo= nombre;
    rutaObj.marcaVehiculo= marca;
    rutaObj.cilindrajeVehiculo= cilindraje;
    rutaObj.placaVehiculo=placa;
    rutaObj.soatVehiculo= soat;
    rutaObj.consumoCombustible= consumo;
    rutaObj.descripcion= descrip;

    rutaObj.id = id;

    // Llenar los Inputs

    
    const reader2 = new FileReader();
    reader2.onload= function(e){img.src= e.target.result;}  
    reader2.readAsDataURL(foto);

   
    

    nombreVehiculo.value =nombre;
    marcaVehiculo.value =  marca;
    cilindrajeVehiculo.value = cilindraje;
    placaVehiculo.value = placa;
    soatVehiculo.value = soat;
    consumoCombustible.value= consumo;
    descripcion.value= descrip;

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;

}











 