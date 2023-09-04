
const fotoVehiculo = document.querySelector('#fotoVehiculo');
const nombreVehiculo = document.querySelector('#nombreVehiculo');
const marcaVehiculo = document.querySelector('#marcaVehiculo');
const cilindrajeVehiculo = document.querySelector('#cilindrajeVehiculo');
const placaVehiculo = document.querySelector('#placaVehiculo');
const soatVehiculo = document.querySelector('#soatVehiculo');
const consumoCombustible= document.querySelector('#consumoCombustible');
const descripcion= document.querySelector('#descripcion');

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
        citaObj[e.target.name] = e.target.files[0];
        


    } );
    nombreVehiculo.addEventListener('change', datosCita);
    marcaVehiculo.addEventListener('change', datosCita);
    cilindrajeVehiculo.addEventListener('change', datosCita);
    placaVehiculo.addEventListener('change', datosCita);
    soatVehiculo.addEventListener('change', datosCita);
    consumoCombustible.addEventListener('change', datosCita);
    descripcion.addEventListener('change', datosCita);

}

const citaObj = {
    foto: '',
    nombre: '',
    marca: '',
    cilindraje: '',
    placa:'',
    soat: '',
    consumo: '',
    descrip: ''
}


function datosCita(e) {
    //  console.log(e.target.name) // Obtener el Input
     citaObj[e.target.name] = e.target.value;
     
}

// CLasses
class Citas {
    constructor() {
        this.citas = []
    }
    agregarCita(cita) {
        this.citas = [...this.citas, cita];
    }
    editarCita(citaActualizada) {
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita)
    }

    eliminarCita(id) {
        this.citas = this.citas.filter( cita => cita.id !== id);
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

            const reader = new FileReader();
            reader.onload= (e) => fotoVehiculoimg.src= e.target.result
            reader.readAsDataURL(foto);
           
           

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
const administrarCitas = new Citas();

function nuevaCita(e) {
    e.preventDefault();

    const {foto,nombre,  marca, cilindraje, placa, soat, consumo, descrip } = citaObj;

    // Validar
    if(foto === '' ||nombre === '' ||  marca === '' || cilindraje=== ''  || placa === '' || soat === '' || consumo==='' || descrip==='' ) {
        ui.imprimirAlerta('Todos los mensajes son Obligatorios', 'error')

        return;
    }

    if(editando) {
        // Estamos editando
        administrarCitas.editarCita( {...citaObj} );

        ui.imprimirAlerta('Guardado Correctamente');

        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        editando = false;

    } else {
        // Nuevo Registrando

        // Generar un ID único
        citaObj.id = Date.now();
        
        // Añade la nueva cita
        administrarCitas.agregarCita({...citaObj});

        // Mostrar mensaje de que todo esta bien...
        ui.imprimirAlerta('Se agregó correctamente')
    }


    // Imprimir el HTML de citas
    ui.imprimirCitas(administrarCitas);

    // Reinicia el objeto para evitar futuros problemas de validación
    reiniciarObjeto();

    // Reiniciar Formulario
    formulario.reset();

}

function reiniciarObjeto() {
    // Reiniciar el objeto
    

    citaObj.fotoVehiculo= '';
    citaObj.nombreVehiculo= '';
    citaObj.marcaVehiculo= '';
    citaObj.cilindrajeVehiculo= '';
    citaObj.placaVehiculo='';
    citaObj.soatVehiculo= '';
    citaObj.consumoCombustible= '';
    citaObj.descripcion= '';


    
}


function eliminarCita(id) {
    administrarCitas.eliminarCita(id);

    ui.imprimirCitas(administrarCitas)
}

function cargarEdicion(cita) {

    const {foto,nombre,  marca, cilindraje, placa, soat, consumo, descrip, id } = cita;

    // Reiniciar el objeto
    citaObj.fotoVehiculo= foto;
    citaObj.nombreVehiculo= nombre;
    citaObj.marcaVehiculo= marca;
    citaObj.cilindrajeVehiculo= cilindraje;
    citaObj.placaVehiculo=placa;
    citaObj.soatVehiculo= soat;
    citaObj.consumoCombustible= consumo;
    citaObj.descripcion= descrip;

    citaObj.id = id;

    // Llenar los Inputs
    
    fotoVehiculo.src =foto;
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