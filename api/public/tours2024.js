window.onload = function() {
    Swal.fire({
        title: 'Bienvenido',
        text: 'Todos los recursos de la página se han cargado.',
        icon: 'success',
        confirmButtonText: 'Entendido'
    }).then(() => {
        let nombre = prompt("¿Cuál es tu nombre?").toUpperCase();

        while (nombre.length < 2) {
            nombre = prompt("El nombre debe tener más de una letra. Ingrésalo nuevamente.").toUpperCase();
        }

        Swal.fire({
            title: 'Introduce tu edad',
            input: 'number',
            inputLabel: 'Debes tener al menos 18 años para comprar entradas.',
            inputPlaceholder: 'Ingresa tu edad',
            inputAttributes: {
                min: 1,
                max: 100,
                step: 1
            },
            confirmButtonText: 'Enviar',

            preConfirm: (age) => {
                if (age < 18) { 
                    Swal.fire({
                        icon: 'error',
                        title: 'Acceso restringido',
                        text: 'Debes tener al menos 18 años para comprar entradas.',
                        confirmButtonText: 'Entendido'
                    });
                }

               
                if (age < 18) {
                    let botonesComprar = document.querySelectorAll('.comprar');
                    
                    botonesComprar.forEach(button => {
                     
                        button.innerHTML = 'No disponible';
                    
                        button.disabled = true;
                    });
                }

               
                const welcomeElement = document.getElementById('welcome');
                if (welcomeElement) {
                    welcomeElement.innerHTML = '<i class="fa-solid fa-ticket"></i> ' + "Hola, " + nombre;
                }
            }
        });
    });
};





const eventos = [
    {
        id: "Pittsburgh",
        fecha: new Date('2024-10-18'),
        pais: 'EEUU',
        estadio: 'Estadio AE Pittsburgh',
        ciudad: 'Pittsburgh',
        boletosDisponibles: 200,
        elementId: "cantidad-boletos",
        eventInfoId: "event-info"
    },
    {
        id: "Noblesville",
        fecha: new Date('2024-10-20'),
        pais: 'EEUU',
        estadio: 'Centro de música Ruoff',
        ciudad: 'Noblesville',
        boletosDisponibles: 200,
        elementId: "cantidad-boletos-Noblesville",
        eventInfoId: "event-info-Noblesville"
    },
    {
        id: "Michigan",
        fecha: new Date('2024-10-21'),
        pais: 'EEUU',
        estadio: 'Teatro musical Pine Knob',
        ciudad: 'Michigan',
        boletosDisponibles: 200,
        elementId: "cantidad-boletos-Michigan",
        eventInfoId: "event-info-Michigan"
    },
    {
        id: "Ohio",
        fecha: new Date('2024-10-22'),
        pais: 'EEUU',
        estadio: 'TempleLive Cleveland Masónico ',
        ciudad: 'Ohio',
        boletosDisponibles: 200,
        elementId: "cantidad-boletos-Ohio",
        eventInfoId: "event-info-Ohio"
    }
];



function actualizarEstadoBoton(evento) {
    const boton = document.getElementById(evento.id);
    const cantidadBoletosElement = document.getElementById(evento.elementId);

 
    if (!boton || !cantidadBoletosElement) {
        console.error(`Error: No se encontró el elemento con ID ${evento.id} o ${evento.elementId}`);
        return;
    }

    if (evento.boletosDisponibles > 0) {
        boton.classList.add("activo");
        boton.classList.remove("inactivo");
        boton.disabled = false;
        cantidadBoletosElement.innerText = evento.boletosDisponibles;
    } else {
        boton.classList.add("inactivo");
        boton.classList.remove("activo");
        boton.disabled = true;
        cantidadBoletosElement.innerHTML = "<span class='sold-out-text' style='color: red;'>SOLD OUT</span>";
    }
}


function manejarCompra(evento) {
    const boton = document.getElementById(evento.id);

    if (!boton) {
        console.error(`Error: No se encontró el botón con ID ${evento.id}`);
        return;
    }

    boton.addEventListener("click", function() {
        let cantidadBoletos = evento.boletosDisponibles;

        Swal.fire({
            title: '¿Cuántos boletos deseas comprar?',
            input: 'number',
            inputAttributes: {
                min: 1,
                max: cantidadBoletos,
                step: 1
            },
            showCancelButton: true,
            confirmButtonText: 'Comprar',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
                if (!value || value < 1 || value > cantidadBoletos) {
                    return 'Por favor, ingresa una cantidad válida.';
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const cantidadDeseada = parseInt(result.value);
                evento.boletosDisponibles -= cantidadDeseada;
                actualizarEstadoBoton(evento);

                if (evento.boletosDisponibles <= 0) {
                    Swal.fire({
                        title: 'SOLD OUT',
                        text: '¡Compra exitosa! Compraste el último boleto.',
                        icon: 'success',
                    });
                } else {
                    Swal.fire({
                        title: '¡Compra exitosa!',
                        text: `Has comprado ${cantidadDeseada} boletos. Quedan ${evento.boletosDisponibles} boletos.`,
                        icon: 'success',
                    });
                }
            }
        });
    });
}


eventos.forEach(evento => {
    const eventInfoElement = document.getElementById(evento.eventInfoId);
   
    if (!eventInfoElement) {
        console.error(`Error: No se encontró el elemento de información con ID ${evento.eventInfoId}`);
        return;
    }

    eventInfoElement.innerText = `${evento.fecha.toLocaleDateString('es-ES')} ${evento.pais} ${evento.estadio}, ${evento.ciudad}`;
    actualizarEstadoBoton(evento);
    manejarCompra(evento);
});
