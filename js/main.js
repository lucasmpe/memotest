const imagenes = ['img/aguilas-doradas.jpg', 'img/alianza-petrolera.jpg', 'img/america-de-cali.jpg', 'img/atletico-bucaramanga.jpg', 
    'img/atletico-junior.jpg', 'img/atletico-nacional.jpg', 'img/deportes-quindio.jpg',
    'img/deportes-tolima.jpg', 'img/deportivo-cali.jpg', 'img/once-caldas.jpg'
];

const CANTIDAD_IMAGENES = imagenes.length;
const $tablero = document.querySelector('#tablero');
let registroAsignaciones = new Array(CANTIDAD_IMAGENES);
let tablero = {};
let $primeraCarta = null;
let intentos = 0;
let aciertos = 0;

function mezclarArreglo(arreglo){
    arreglo.sort(()=> Math.random() - 0.5);
}

function crearTablero() {

    let frentes = imagenes.concat(imagenes);
    mezclarArreglo(frentes);

    for (let i = 0; i < CANTIDAD_IMAGENES * 2; i++) {
       
        const $carta = document.createElement('div');
        $carta.classList = 'carta';
        $carta.id = `carta-${i + 1}`;
        
        const $dorso = document.createElement('img');
        $dorso.classList = 'img-fluid dorso';
        $dorso.src = 'img/dorso-carta.jpg';

        const $frente = document.createElement('img');
        $frente.classList = 'img-fluid oculto';
        $frente.src = frentes[i];

        $carta.appendChild($dorso);
        $carta.appendChild($frente); 
        $tablero.appendChild($carta);

        tablero[`carta-${i + 1}`] = $frente.src;
    }
}

function reiniciar() {
    tablero = {};
    cartaUsuario = null;
    intentos = 0;
    aciertos = 0;
    const $finDeJuego = document.querySelector('.fin-de-juego');
    $finDeJuego.removeChild($finDeJuego.firstChild);
    $finDeJuego.classList.add('oculto');
    $tablero.classList.remove('oculto');
    iniciarJuego();
}

function girarCarta($carta) {
    $carta.childNodes.forEach(function ($img) {
        $img.classList.toggle('oculto');
    });
}

function mostrarResultado() {
    const $finDeJuego = document.querySelector('.fin-de-juego');
    $tablero.classList.add('oculto');

    const $mensaje = document.createElement('h1');
    $mensaje.textContent = `Finalizaste el juego en ${intentos} intentos.`;
    $finDeJuego.appendChild($mensaje);
    $finDeJuego.classList.remove('oculto');
    
    setTimeout(function() {
        reiniciar();
    }, 3000);
}

function habilitarInputUsuario() {
    $tablero.onclick = function (e) {
        const $elemento = e.target.parentNode;
        if ($elemento.classList.contains('carta')) {
            manejarClickCarta($elemento);
        }
    };
}

function bloquearInputUsuario() {
    $tablero.onclick = function() {
    };
  }

function manejarClickCarta($cartaActual) {
    
    if ($primeraCarta === $cartaActual) { 
        return;
    } else {
        girarCarta($cartaActual);
    }

    if (!$primeraCarta) {
        $primeraCarta = $cartaActual;
    } else {
        
        bloquearInputUsuario();

        intentos++;
        
        if (cartasSonIguales($primeraCarta, $cartaActual)) {
            setTimeout(function () {
                eliminarCarta($primeraCarta);
                eliminarCarta($cartaActual);
                $primeraCarta = null;
                habilitarInputUsuario();
            }, 400);
        
            aciertos++;

            if (esFinDeJuego()) {
                mostrarResultado();
            }
        
        } else {
    
            setTimeout(function () {
                girarCarta($cartaActual);
                girarCarta($primeraCarta);
                $primeraCarta = null;
                habilitarInputUsuario();
            }, 400);
        }
    }
}

function cartasSonIguales($carta, $otraCarta) {
    return tablero[$carta.id] === tablero[$otraCarta.id];
}

function eliminarCarta($carta) {
    while ($carta.firstChild) {
        $carta.removeChild($carta.firstChild)
    }
}

function esFinDeJuego() {
    return aciertos === CANTIDAD_IMAGENES;
}

function iniciarJuego() {
    crearTablero();
    habilitarInputUsuario();
}

iniciarJuego();
