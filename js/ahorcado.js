const btnIniciarJuego = document.getElementById('iniciar-juego');
const contenedorPrincipal = document.getElementById('contenedor-principal');
const inputOculto = document.getElementById('input-oculto');
const btnNuevaPalabra = document.getElementById('nueva-palabra');
const inputNuevaPalabra = document.getElementById('input-nueva-palabra');
const contenedorCanvas = document.getElementById('contenedor-canvas');
const divBotones = document.getElementById('botones');
const btnReiniciarJuego = document.getElementById('btn-reiniciar');
const btnVolverInicio = document.getElementById('btn-inicio');
const listaPalabras = palabras.map((palabra) => palabra.toUpperCase());

let palabraSorteada = '';
const soloLetras ='^[A-ZÑ]+$';
let letrasUsadas = [];
let letrasAcertadas = 0;
let vidas = 9;
let juegoIniciado = false;

iniciarApp();

function iniciarApp() {
    agregarEventListeners();
    ocultarCanvas();
    divBotones.style.display = 'none';
};

function agregarEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
        btnIniciarJuego.addEventListener('click', iniciarJuego);
        btnReiniciarJuego.addEventListener('click', reiniciarJuego);
        btnVolverInicio.addEventListener('click', volverInicio);
        contenedorCanvas.addEventListener("click", focusInput);  
        btnNuevaPalabra.addEventListener("click", agregarPalabras);  
        inputOculto.addEventListener("input", (e)=> {teclaPresionada(e)});
    });
}

function iniciarJuego() {
    ocultarInicio();
    juegoIniciado = true;
    divBotones.style.display = '';//se quita para que se pueda iniciar un nuevo juego si se quiere, se pone none
    palabraSorteada = sortearPalabra();
    mostrarCanvas();
    abrirTeclado();
}

function focusInput() {
    inputOculto.focus();
}

function ocultarInicio() {
    contenedorPrincipal.style.display = "none";
}

function sortearPalabra() {
    let random = Math.floor(Math.random() * listaPalabras.length);
    return listaPalabras[random];
}

function abrirTeclado() {
    inputOculto.disabled = false;    
    inputOculto.focus();
}

function teclaPresionada(e) {
    inputOculto.blur();
    if(juegoIniciado === false) {
        return;
    }
    
    const letra = e.target.value.toUpperCase();
    verificarLetra(letra);
    inputOculto.value = '';  
    inputOculto.focus();  
}

function verificarLetra(letra) {    
    let acierto = false;
    
    if(letra.match(soloLetras) != null){
        if(agregarLetrasUsadas(letra)){
            for (let i = 0; i < palabraSorteada.length; i++) {
                if (palabraSorteada[i] === letra) {                
                    reemplazarEspacioPorLetra(letra, i, palabraSorteada.length);
                    letrasAcertadas++;
                    acierto = true;
                }
            }
            if(acierto === false) {
                vidas--;
            }
            
            comenzarDibujo(vidas);
            verifcarVictoria();
        };
    } else {
        mensajeError();
    }
}

function agregarLetrasUsadas(letra) {
    if(letrasUsadas.includes(letra)){        
        return false;
    } else {
        letrasUsadas.push(letra);        
        dibujarLetrasUsadas(letra, letrasUsadas.length);
        return true;
    }
}

function verifcarVictoria(){
    if(vidas === 0) {        
        juegoIniciado = false;
        inputOculto.disabled = true;    
        dibujarResultado(false);
        divBotones.style.display = 'block';

    } else if (letrasAcertadas === palabraSorteada.length) {
        juegoIniciado = false;
        inputOculto.disabled = true;    
        dibujarResultado(true);
        dibujarHombreGano();
        divBotones.style.display = 'block';        
    }
}

function comenzarDibujo(vidas) {
    switch(vidas) {
        case 9:
            break;
        case 8:
            dibujarHorca();
            break;
        case 7:
            dibujarCabeza();
            break;
        case 6:
            dibujarCuello();
            break;
        case 5:
            dibujarCuerpo();
            break;
        case 4:
            dibujarManoDerecha();
            break;
        case 3:
            dibujarManoIzquierda();
            break;
        case 2:
            dibujarPieDerecho();
            break;
        case 1:
            dibujarPieIzquierdo();
            break;
        case 0:
            dibujarCara();
            break;
        default:
            break;
    }
}

function cerrarTeclado() {
    inputOculto.disabled = true; 
    inputOculto.blur();
}

function reiniciarJuego() {    
    palabraSorteada = '';    
    letrasUsadas = [];
    letrasAcertadas = 0;
    vidas = 9;
    juegoIniciado = false;
    canvas.width = canvas.width;
    iniciarJuego();
}

function volverInicio() {
    window.location.reload();    
}

function agregarPalabras() {
    let nuevaPalabra = inputNuevaPalabra.value.toUpperCase();

    if(nuevaPalabra.match(soloLetras)!=null && nuevaPalabra.length > 3 && nuevaPalabra.length < 13){    
        palabras.push(nuevaPalabra);    
        inputNuevaPalabra.value = "";

        const mensajeNuevaPalabra = document.querySelector('.mensaje');

        if(!mensajeNuevaPalabra) {
            inputNuevaPalabra.classList.add('input-oculto');
            mensajePalabraAgregada('exito');
        } 

    } 
    else {
        inputNuevaPalabra.value = "";
        inputNuevaPalabra.classList.add('input-oculto');
        mensajePalabraAgregada('error');
    }
}

function mensajePalabraAgregada(tipo) {
    const divBotonesInput = document.getElementById('botones-input');
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('mensaje');    

    if(tipo === 'exito') {
        divMensaje.classList.add('mensaje-exito');    
        divMensaje.textContent = 'Palabra agregada exitosamente ☺';            
        divBotonesInput.appendChild(divMensaje);

    } else if (tipo === 'error') {
        divMensaje.classList.add('mensaje-error');    
        divMensaje.textContent = ' ✖ No se permiten palabras de mas de 12 caracteres, números, espacios, ni caracteres especiales';            
        divBotonesInput.appendChild(divMensaje);
    }    

    btnNuevaPalabra.disabled = true;
    
    setTimeout(()=> {
        divMensaje.remove();
        btnNuevaPalabra.disabled = false;
        inputNuevaPalabra.classList.remove('input-oculto');
    }, 3000);
}

function mensajeError() {
    const mensajeError = document.querySelector('.mensaje-error');
    
    if(!mensajeError) {            
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('mensaje-error');    
        divMensaje.textContent = 'No se permiten números, espacios ni caracteres especiales';            
        contenedorCanvas.appendChild(divMensaje);
        inputOculto.disabled = true;
        
        setTimeout(()=> {
            divMensaje.remove();
            inputOculto.disabled = false;
            inputOculto.focus();
        }, 3000);
    }
}