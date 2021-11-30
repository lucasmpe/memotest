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

function crearTablero() {
    for (let i = 0; i < CANTIDAD_IMAGENES * 2; i++) {
        let $carta = document.querySelector(`#carta-${i + 1}`);
        if (!$carta) {
            $carta = document.createElement('div');
            $carta.classList = 'carta';
            $carta.id = `carta-${i + 1}`;
        } else {
            $carta = document.querySelector(`#carta-${i + 1}`);
        }
        const $imagen = document.createElement('img');
        $imagen.classList = 'img-fluid dorso';
        $imagen.src = 'img/dorso-carta.jpg';

        $carta.appendChild($imagen);
        $tablero.appendChild($carta);
    }
}

function registroAsignacionesEstaLleno() {
    let suma = 0;
    for (let i = 0; i < registroAsignaciones.length; i++) {
        suma += registroAsignaciones[i];
    }
    if (suma === CANTIDAD_IMAGENES * 2) {
        return true;
    }
    return false;
}

function obtenerImagen() {
    if (registroAsignacionesEstaLleno()) {
        return null;
    }
    const indiceAleatorio = Math.floor(Math.random() * 20);
    if (registroAsignaciones[indiceAleatorio] < 2) {
        const $imagen = document.createElement('img');
        $imagen.classList = 'img-fluid oculto';
        $imagen.src = imagenes[indiceAleatorio];
        registroAsignaciones[indiceAleatorio]++;
        return $imagen;
    } else {
        return obtenerImagen();
    }
}

function iniciarTablero() {
    registroAsignaciones.fill(0);
    for (let i = 0; i < CANTIDAD_IMAGENES * 2; i++) {
        const $carta = document.querySelector(`#carta-${i + 1}`);
        const $imagen = obtenerImagen();
        $carta.appendChild($imagen);
        tablero[`carta-${i + 1}`] = $imagen.src;
    }
}

function reiniciar() {
    tablero = {};
    cartaUsuario = null;
    intentos = 0;
    aciertos = 0;
    const $finDeJuego = document.querySelector('.fin-de-juego');
    $finDeJuego.firstChild.textContent = ''; //No funciona me parece. Chequear
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

function manejarClickCarta($cartaActual) {
    girarCarta($cartaActual);

    if (!$primeraCarta) {
        $primeraCarta = $cartaActual;
    } else {

        if ($primeraCarta === $cartaActual) { 
            $primeraCarta = null;
            return;
        }

        intentos++;
        
        if (cartasSonIguales($primeraCarta, $cartaActual)) {
            setTimeout(function () {
                eliminarCarta($primeraCarta);
                eliminarCarta($cartaActual);
                $primeraCarta = null;
            }, 300);
        
            aciertos++;

            if (esFinDeJuego()) {
                mostrarResultado();
            }
        
        } else {
    
            setTimeout(function () {
                girarCarta($cartaActual);
                girarCarta($primeraCarta);
                $primeraCarta = null;
            }, 300);
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
    iniciarTablero();
    habilitarInputUsuario();
}

iniciarJuego();
