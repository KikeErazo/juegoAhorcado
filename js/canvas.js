const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const color01 = '#e8f1ff'; //azul claro
const color02 = '#00626d'; //azul
const color03 = '#000000'; //negro
const color04 = '#FFFFFF'; //blanco
const color05 = '#000000'; //negro
const color06 = '#FF0000'; //rojo

function mostrarCanvas() {//fondo canvas para dibujar
    canvas.style.display = "block";
    ctx.fillStyle = color01;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    dibujarTriangulo();
    dibujarEspaciosPalabra(palabraSorteada);
}

function ocultarCanvas() {
    canvas.style.display = "none";
}

function dibujarTriangulo() {
    ctx.fillStyle = color05;
    ctx.beginPath();
    ctx.moveTo(0,400);
    ctx.lineTo(150,350)
    ctx.lineTo(300,400)
    ctx.fill();
}

function dibujarHorca() {
    ctx.beginPath();
    ctx.lineWidth = 15;
    ctx.moveTo(150,351);
    ctx.lineTo(150,50);
    ctx.strokeStyle = color02;
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.moveTo(145,60);
    ctx.lineTo(250,30);
    ctx.strokeStyle = color02;
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(245,30);
    ctx.lineTo(245,150);
    ctx.strokeStyle = color02;
    ctx.stroke();
}

function dibujarCabeza() {
    ctx.fillStyle = color03;
    ctx.beginPath();
    ctx.arc(245,130,35,0,2*Math.PI);
    ctx.fill();
}

function dibujarCuello() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(245,150);
    ctx.lineTo(245,180);
    ctx.strokeStyle = color03;
    ctx.stroke();
}

function dibujarCuerpo() {
    ctx.beginPath();
    ctx.lineWidth = 25;
    ctx.moveTo(245,180);
    ctx.lineTo(245,230);
    ctx.strokeStyle = color03;
    ctx.stroke();
}

function dibujarManoDerecha() {
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.moveTo(245,180);
    ctx.lineTo(295,175);
    ctx.strokeStyle = color03;
    ctx.stroke();
}

function dibujarManoIzquierda() {
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.moveTo(245,180);
    ctx.lineTo(195,175);
    ctx.strokeStyle = color03;
    ctx.stroke();
}

function dibujarPieDerecho() {
    ctx.beginPath();
    ctx.lineWidth = 15;
    ctx.moveTo(245,230);
    ctx.lineTo(295,330);
    ctx.strokeStyle = color03;
    ctx.stroke();
}

function dibujarPieIzquierdo() {
    ctx.beginPath();
    ctx.lineWidth = 15;
    ctx.moveTo(245,230);
    ctx.lineTo(195,330);
    ctx.strokeStyle = color03;
    ctx.stroke();
}

function dibujarCara() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(225,120);
    ctx.lineTo(235,130);
    ctx.strokeStyle = color04;
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(235,120);
    ctx.lineTo(225,130);
    ctx.strokeStyle = color04;
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(255,120);
    ctx.lineTo(265,130);
    ctx.strokeStyle = color04;
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(265,120);
    ctx.lineTo(255,130);
    ctx.strokeStyle = color04;
    ctx.stroke();

    ctx.fillStyle = color04;
    ctx.beginPath();
    ctx.arc(245,160,15,1.25*Math.PI,1.75*Math.PI);
    ctx.stroke();
}

function dibujarHombreGano() {    
    ctx.clearRect(0,100,300,460);
    ctx.fillStyle = color01;
    ctx.fillRect(0, 25, 295, 360);

    dibujarCabeza();
    dibujarCuello();
    dibujarCuerpo();
    dibujarManoDerecha();
    dibujarManoIzquierda();
    dibujarPieDerecho();
    dibujarPieIzquierdo();

    ctx.fillStyle = color04;
    ctx.beginPath();
    ctx.arc(230,125,5,0,2*Math.PI);
    ctx.fill();

    ctx.fillStyle = color04;
    ctx.beginPath();
    ctx.arc(260,125,5,0,2*Math.PI);
    ctx.fill();

    ctx.fillStyle = color04;
    ctx.beginPath();
    ctx.arc(245,125,25,0.25*Math.PI,0.75*Math.PI);
    ctx.fill();    
}

function dibujarEspaciosPalabra(palabraSorteada) {
    for (let i = 0; i < palabraSorteada.length; i++) {        
        ctx.fillStyle = color02;
        ctx.font = '40px sans-serif';
        ctx.textAlign = 'center';
        let ejeX = i*45 + (canvas.width - palabraSorteada.length * 50) / 2 + 170;
        ctx.fillText('_', ejeX, 450);
    }
}

function reemplazarEspacioPorLetra(letra, index, posicion) {
    ctx.fillStyle = color03;
    ctx.font = '40px sans-serif';
    ctx.textAlign = 'center';
    let ejeX = index*45 + (canvas.width - posicion * 50) / 2 + 170;
    ctx.fillText(letra, ejeX, 450);
}

function dibujarLetrasUsadas(letra, index) {
    if(index < 7) {
        ctx.fillStyle = color02;
        ctx.font = '20px sans-serif';
        ctx.textAlign = "center";
        let ejeX = (index-1)*20 + 100;
        ctx.fillText(letra, ejeX, 420);

    } else if(index > 6 && index < 13) {
        ctx.fillStyle = color02;
        ctx.font = '20px sans-serif';
        ctx.textAlign = "center";
        let ejeX = (index-7)*20 + 100;
        ctx.fillText(letra, ejeX, 450);
    } else if(index > 12 && index < 19) {
        ctx.fillStyle = color02;
        ctx.font = '20px sans-serif';
        ctx.textAlign = "center";
        let ejeX = (index-13)*20 + 100;
        ctx.fillText(letra, ejeX, 470);
    }
}

function dibujarResultado(triunfo) {
    if(triunfo) {
        ctx.fillStyle = color05;
        ctx.font = '20px sans-serif';
        ctx.textAlign = "center";
        ctx.fillText('Ganaste ☺ ', 520, 110);
        ctx.fillText('Felicidades ♥ Juega de nuevo', 520, 170);
    } else {
        ctx.fillStyle = color06;
        ctx.font = '20px sans-serif';
        ctx.textAlign = "center";
        ctx.fillText('Perdiste ☠ Juega de nuevo ☹', 520, 110);

        ctx.font = '20px sans-serif';
        ctx.textAlign = "center";
        ctx.fillText(`La palabra era ${palabraSorteada}`, 520, 170);
    }
}

function dibujarFinDelJuego() {
    ctx.fillStyle = color06;
    ctx.font = '60px sans-serif';
    ctx.textAlign = "center";
    ctx.fillText('Fin del juego,', 520, 110);
}