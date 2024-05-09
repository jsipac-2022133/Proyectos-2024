let listaTareas = [];

const objTarea = {
    id: "",
    tarea: "",
    prioridad: ""
}

let editando = false;

const formulario = document.querySelector("#formulario");
const tareaInput = document.querySelector("#tarea");
const prioridadInput=document.querySelector("#prioridad")
const btnAgregar = document.querySelector("#btnAgregar");

//Cuando detecte el boton submit, llamara a la funcion validarFormulario
formulario.addEventListener(`submit`, validarFormulario);

function validarFormulario(e) {
    e.preventDefault(); //Para no se ejecute de forma automatica

    if (tareaInput.value === "" || prioridadInput.value==="") {
        alert(`Debes llenar todos los campos`);
        return;
    }

    if (editando) {
        editarTarea();
        editando = false;
    } else {
        objTarea.id = listaTareas.length + 1; //Con esto el id sera la cantidad de elementos que tenga el array +1 
        objTarea.tarea = tareaInput.value;
        objTarea.prioridad=prioridadInput.value;
        agregarTarea();
    }

}


function agregarTarea() {
    listaTareas.push({ ...objTarea });

    mostrarTareas();

    //Esto es para que se limpien los inputs despues de agregar
    formulario.reset();

    limpiarObjeto();

}

function limpiarObjeto() {
    objTarea.id = "";
    objTarea.tarea = "";
    objTarea.prioridad="";
}

function mostrarTareas() {

    limpiarHTML();

    const divTareas = document.querySelector(".div-tareas");
    const listaOrdenada = ordenarPorPrioridad(listaTareas);

    listaOrdenada.forEach(tareas => {
        const { id, tarea, prioridad } = tareas;

        const parrafo = document.createElement(`p`);
        const prioridadSpan = document.createElement("span");
        
         if(prioridad.substring(2)=="Urgente"){            
            prioridadSpan.style.color = "red";         
         }else if(prioridad.substring(2)=="Muy importante"){            
            prioridadSpan.style.color = "#c76e16";         
         }else if(prioridad.substring(2)=="Importante"){            
            prioridadSpan.style.color = "orange";         
         }else if(prioridad.substring(2)=="Hay tiempo"){            
            prioridadSpan.style.color = "green";         
         }
         
 
         prioridadSpan.textContent = prioridad.substring(2);
         parrafo.textContent = `${tarea}  |  `;
         parrafo.appendChild(prioridadSpan);
        parrafo.dataset.id = id;

        const editarBoton = document.createElement("button");
        const imagenEditar = document.createElement("img");
        imagenEditar.src = "img/Editar.png";
        imagenEditar.width = 20;
        imagenEditar.height = 20;
        editarBoton.appendChild(imagenEditar);
        editarBoton.onclick = () => cargarTarea(tareas);
        editarBoton.classList.add("btn", "btn-editar");
        parrafo.appendChild(editarBoton);

        const eliminarBoton = document.createElement("button");
        const imagen = document.createElement("img");
        imagen.src = "img/Eliminar.png";
        imagen.width = 20;
        imagen.height = 20;
        eliminarBoton.appendChild(imagen);
        eliminarBoton.onclick = () => eliminarTarea(id);
        eliminarBoton.classList.add("btn", "btn-eliminar");        
        parrafo.appendChild(eliminarBoton);

        const hr = document.createElement(`hr`);

        divTareas.appendChild(parrafo);
        divTareas.appendChild(hr);


    })
}

// Función para ordenar la lista de tareas por prioridad
function ordenarPorPrioridad(lista) {
    return lista.slice().sort((a, b) => {
        const prioridadA = a.prioridad;
        const prioridadB = b.prioridad;

        // Ordenar por prioridad de forma ascendente (A < B < C < D)
        if (prioridadA < prioridadB) return -1;
        if (prioridadA > prioridadB) return 1;
        return 0;
    });
}



function cargarTarea(tareas) {
    const { id, tarea, prioridad } = tareas;
    tareaInput.value = tarea;
    prioridadInput.value=prioridad;
    objTarea.id = id;

    //Esto es para que el boton cambie de texto
    formulario.querySelector(`button[type="submit"]`).textContent = "Actualizar";

    editando = true;
}

function editarTarea() {
    objTarea.tarea = tareaInput.value;
    objTarea.prioridad=prioridadInput.value;

    listaTareas.map(tarea => {
        if (tarea.id === objTarea.id) {
            tarea.id == objTarea.id;
            tarea.tarea = objTarea.tarea;
            tarea.prioridad=objTarea.prioridad;
        }
    });

    limpiarHTML();
    mostrarTareas();

    formulario.reset();

    formulario.querySelector(`button[type="submit"]`).textContent = `Agregar`;

    editando = false;
}

function eliminarTarea(id) {
    listaTareas = listaTareas.filter(tarea => tarea.id !== id);
    limpiarHTML();
    mostrarTareas();
}

function limpiarHTML() {
    const divTareas = document.querySelector(".div-tareas");
    while (divTareas.firstChild) {
        divTareas.removeChild(divTareas.firstChild);
    }
}







