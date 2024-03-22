let Titulo = document.title;

window.addEventListener('blur', () => {
    Titulo = document.title;
    document.title = "No te vallas, regresa :(";
})

window.addEventListener('focus', () => {
    document.title = Titulo;
})

let h1 = document.getElementById("Titulo");
let Boton1 = document.getElementById("B1");

let musicaReproduciendo = false;

document.getElementById('BVer').addEventListener('click', function() {
    const musica = document.getElementById('musica');
    
    if (musicaReproduciendo) {
        musica.pause();
        musicaReproduciendo = false;
    } else {
        musica.play();
        musicaReproduciendo = true;
    }
});

Boton1.addEventListener('click', function() {
    const musica = document.getElementById('musica');
    musica.play();
    musicaReproduciendo = true;

    const ContenedorBotones = document.querySelector(".Con");
    document.querySelector(".Texto").style.display = "block";
    ContenedorBotones.style.display = "none";

    DibujarFlor(500, 100, 6, 30, 100);
    h1.remove();
});

document.getElementById("B12").addEventListener('click', function() {
    const ContenedorBotones = document.querySelector(".Con");
    ContenedorBotones.style.display = "none";
    document.querySelector(".Texto").style.display = "block";
    CrearVarias();
    h1.remove();
});

const canvas = document.getElementById('Flor');
const ctx = canvas.getContext('2d');

function DibujarPetalo(x, y, RadioX, scala, Rotacion, color, pasos) {
    const Numero = scala;
    const AnguloIncrement = (Math.PI / pasos) * 2;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Rotacion);
    ctx.scale(1, Numero);
    ctx.beginPath();

    for (let i = 0; i <= pasos; i++) {
        const AnguloActual = i * AnguloIncrement;
        const currentRadius = Math.sin(AnguloActual) * RadioX;
        const PuntoY = Math.sin(AnguloActual) * currentRadius;
        const PuntoX = Math.cos(AnguloActual) * currentRadius;

        if (i === 0) {
            ctx.moveTo(PuntoX, PuntoY);
        } else {
            ctx.lineTo(PuntoX, PuntoY);
        }
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();
    }
    ctx.restore();
}

function DibujarTallo(x, y, AltoTrazo) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + AltoTrazo);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function DibujarCentro(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'brown';
    ctx.fill();
}


function DibujarPetalos(x, y, NumeroPetalos, RadioXPetalo, RadioYPetalo) {
    const AnguloIncrement = (Math.PI * 2) / NumeroPetalos;
    let petalosDibujados = 0;

    function dibujarSiguientePetalo() {
        if (petalosDibujados < NumeroPetalos) {
            const Angulo = petalosDibujados * AnguloIncrement;
            DibujarPetalo(x, y, RadioXPetalo, 2, Angulo, 'yellow', 100);
            petalosDibujados++;
            setTimeout(dibujarSiguientePetalo, 500);
        }
    }
    dibujarSiguientePetalo();
}
function DibujarFlor(x, y, NumeroPetalos, RadioXPetalo, RadioYPetalo) {
  DibujarTallo(x, y, 200);
  setTimeout(() => {
      DibujarPetalos(x, y, NumeroPetalos, RadioXPetalo, RadioYPetalo);
      setTimeout(() => {
          DibujarCentro(x, y);
      }, 500);
  }, 500);
}

function CrearVarias() {
    const numFlores = 12;
    const espacioX = canvas.width / 4;
    const espacioY = canvas.height / 3;
    const TamañoFlor = 130;

    for (let i = 0; i < numFlores; i++) {
        const fila = Math.floor(i / 4);
        const columna = i % 4;
        const x = espacioX * columna + espacioX / 2;
        const y = espacioY * fila
        DibujarFlor(x, y, 8, 30, 80, TamañoFlor);
    }
}

document.getElementById("BVer").addEventListener('click', function() {
    document.getElementById("resultado").style.display = "block";
});

document.getElementById("BotonCerrar").addEventListener('click', function() {
    document.getElementById("resultado").style.display = "none";
    document.querySelector(".Contenedor-Binicio").style.display = "none";
    document.querySelector(".Con-2").style.display = "block";
});
