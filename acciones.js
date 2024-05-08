const ABECEDARIO = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
const INTENTOSMAXIMOS = 7;
const ENMASCARAR = "_";

const letras = {};
let palabraOculta = [];
let intentosRestantes = 0;

document.addEventListener("DOMContentLoaded", () => {
    reiniciarJuego();
}); // Antes de ejecutar Javascript toda la página debe dibujarse, ya lo quité y no afectó

function reiniciarJuego() {
    reiniciarIntentos();
    crearBotones();
    elegirPalabra();
    actualizarVista();
}

function obtenerPalabraEncontrada() {
    let palabra = "";
    for (const letra of palabraOculta) {
        palabra += letra.letra;
    }
    return palabra;
}

function mostrarImagen() {    
    const canvas = document.getElementById('hangmanCanvas');
    const context = canvas.getContext('2d');

    const dibujarAhorcado = (intentosIncorrectos) => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    
        context.beginPath();
        context.moveTo(10, 190);
        context.lineTo(190, 190);
        context.stroke();
    
        context.beginPath();
        context.moveTo(30, 190);
        context.lineTo(30, 10);
        context.lineTo(100, 10);
        context.stroke();

        if (intentosIncorrectos > 0) {
            //Lazo
        context.beginPath();
        context.moveTo(30, 190);
        context.lineTo(30, 10);
        context.lineTo(100, 10);
        context.lineTo(100, 40);
        context.stroke();
          }
    
        if (intentosIncorrectos > 1) {
          // Cabeza
          context.beginPath();
          context.arc(100, 60, 20, 0, Math.PI * 2);
          context.stroke();
        }
    
        if (intentosIncorrectos > 2) {
          // Cuerpo
          context.beginPath();
          context.moveTo(100, 80);
          context.lineTo(100, 130);
          context.stroke();
        }
    
        if (intentosIncorrectos > 3) {
          // Brazo izquierdo
          context.beginPath();
          context.moveTo(70, 100);
          context.lineTo(100, 90);
          context.stroke();
        }
    
        if (intentosIncorrectos > 4) {
          // Brazo derecho
          context.beginPath();
          context.moveTo(130, 100);
          context.lineTo(100, 90);
          context.stroke();
        }
    
        if (intentosIncorrectos > 5) {
          // Pierna izquierda
          context.beginPath();
          context.moveTo(80, 150);
          context.lineTo(100, 130);
          context.stroke();
        }
    
        if (intentosIncorrectos > 6) {
          // Pierna derecha
          context.beginPath();
          context.moveTo(120, 150);
          context.lineTo(100, 130);
          context.stroke();
        }

      };
    
    
    dibujarAhorcado(INTENTOSMAXIMOS - intentosRestantes); 
    return canvas.toDataURL();
}

function reiniciarIntentos() {
    intentosRestantes = INTENTOSMAXIMOS;
    document.querySelector(".text-danger").textContent = "Intentos restantes: " + intentosRestantes;
    
}

function elegirPalabra() {
    const palabras = ["durazno","reloj","manzana", "lunes", "eucalipto", "pelota", "mariposa", "teclado","diversificado","tortuga","carro","medicina","cuaderno","escritorio","estadio","equipo","partido"];
    const palabra = palabras[Math.floor(Math.random() * palabras.length)];
    prepararPalabra(palabra);
}

function prepararPalabra(palabra) {
    palabra = palabra.toUpperCase();
    palabraOculta = [];
    for (const letra of palabra) {
        palabraOculta.push({
            letra,
            hidden: true
        });
    }
}

function mostrarPalabra() {
    let palabraMostrada = "";
    for (const letra of palabraOculta) {
        if (letra.hidden) {
            palabraMostrada += ENMASCARAR;
        } else {
            palabraMostrada += letra.letra;
        }
        palabraMostrada += " ";
    }
    return palabraMostrada;
}

function crearBotones() {
    const contenedorBotones = document.querySelector(".col-12");

    for (const letra of ABECEDARIO) {
        letras[letra] =letra;
         

        const boton = document.createElement("button");
        boton.textContent = letra;
        boton.className = "btn btn-dark btn-lg";
        boton.style.marginRight = "2px";
        boton.dataset.letra = letra; 
        contenedorBotones.appendChild(boton);

        boton.addEventListener("click", () => intentarConLetra(letra));
    }
}

function letraEstaEnPalabra(buscarLetra) {
    for (const letra of palabraOculta) {
        if (letra.letra === buscarLetra) {
            return true;
        }
    }
    return false;
}

function descubrirLetra(letra) {
    for (const indice in palabraOculta) {
        if (palabraOculta[indice].letra === letra) {
            palabraOculta[indice].hidden = false;
        }
    }
}

function intentarConLetra(letra) {
    //letras[letra].disabled = true;
    if (!letraEstaEnPalabra(letra)) {
        intentosRestantes -= 1;
    } else {
        descubrirLetra(letra);
    }
    if (intentosRestantes == 0) {
        mostrarImagen();
        deshabilitarTodosLosBotones();
        setTimeout(() => {
            alert("Perdiste! La palabra era: " + obtenerPalabraEncontrada());
            location.reload();
        }, 2000); // Mostrar el mensaje después de algunos segundos
    }


    if(juegoGanado()){
        alert("Ganaste!!!")
        location.reload();
    }

    
function juegoGanado() {
    for (const letra of palabraOculta) {
        if (letra.hidden) {
            return false;
        }
    }
    return true;
}   
    
    actualizarVista();

    // Deshabilitar el botón correspondiente
    const boton = document.querySelector(`button[data-letra="${letra}"]`);
    boton.disabled = true;
}

function deshabilitarTodosLosBotones() {
    const botones = document.querySelectorAll(".btn-dark");
    for (const boton of botones) {
        boton.disabled = true;
    }
}



function actualizarVista() {
    const remainingAttemptsElement = document.querySelector(".text-danger");
    remainingAttemptsElement.textContent = "Intentos restantes: " + intentosRestantes;

    document.querySelector(".displayed-word").textContent = "Palabra: " + mostrarPalabra();
    document.querySelector("#hangmanCanvas").src = mostrarImagen();
}


