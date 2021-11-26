const cartas = ['img/aguilas-doradas.jpg', 'img/alianza-petrolera.jpg', 'img/america-de-cali.jpg', 'img/atletico-bucaramanga.jpg',
    'img/atletico-huila.jpg', 'img/atletico-junior.jpg', 'img/atletico-nacional.jpg', 'img/deportes-quindio.jpg',
    'img/deportes-tolima.jpg', 'img/deportivo-cali.jpg', 'img/deportivo-pasto.jpg', 'img/deportivo-pereira.jpg',
    'img/envigado-fc.jpg', 'img/independiente-medellin.jpg', 'img/independiente-santa-fe.jpg', 'img/jaguares-de-cordoba.jpg',
    'img/la-equidad-seguros.jpg', 'img/millonarios.jpg', 'img/once-caldas.jpg', 'img/patriotas-boyaca.jpg'
];

const CANTIDAD_CARTAS = cartas.length;
let registroAsignaciones = new Array(CANTIDAD_CARTAS);
let tablero = {};
let cartaUsuario = null;
let intentos = 0;
let aciertos = 0;

function crearTablero() {
    const $tablero = document.querySelector('#tablero');
    for (let i = 0; i < CANTIDAD_CARTAS * 2; i++) {
        const $carta = document.createElement('div');
        $carta.classList = 'carta';
        $carta.id = `carta-${i + 1}`;
        
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
    if (suma === CANTIDAD_CARTAS * 2) {
        return true;
    }
    return false;
}

function crearImagen() {
    if (registroAsignacionesEstaLleno()) {
        return null;
    }
    const indiceAleatorio = Math.floor(Math.random() * 20);
    if (registroAsignaciones[indiceAleatorio] < 2) {
        const $imagen = document.createElement('img');
        $imagen.classList = 'img-fluid oculto';
        $imagen.src = cartas[indiceAleatorio];
        registroAsignaciones[indiceAleatorio]++;
        return $imagen;
    } else {
        return crearImagen();
    }
}

function iniciarTablero() {
    registroAsignaciones.fill(0);
    for (let i = 0; i < CANTIDAD_CARTAS * 2; i++) {
        const $carta = document.querySelector(`#carta-${i + 1}`);
        const $imagen = crearImagen();
        $carta.appendChild($imagen);
        tablero[`carta-${i + 1}`] = $imagen.src;
    }
}

function reiniciar() {
    tablero = {};
    cartaUsuario = null;
    intentos = 0;
    aciertos = 0;

    iniciarJuego();
}

function girarCarta(carta) {
    carta.childNodes.forEach(function (img) {
        if (!img.classList.toggle('oculto')) {
        }
    });
}

function bloquearCartas(carta1, carta2) {
    carta1.onclick = function() {};
    carta2.onclick = function() {};
}

function limpiarTablero() {
    document.querySelectorAll('.carta').forEach(function(carta) {
        carta.remove();
      });
}

function ganar() {

    /*Hacer algo si gana*/
    limpiarTablero();

    reiniciar();

}

function manejarInputUsuario(e) {
    
    const $carta = e.target.parentNode;
    girarCarta($carta);

    if (!cartaUsuario) {
        cartaUsuario = $carta;
        
    } else {
        intentos++;
        if (tablero[cartaUsuario.id] !== tablero[$carta.id]) {
        
            setTimeout(function() {
                girarCarta($carta);
            }, 1000);

            setTimeout(function() {
                girarCarta(cartaUsuario);
                cartaUsuario = null;
            }, 1000);

            
        }

        if(tablero[cartaUsuario.id] === tablero[$carta.id]) {
            aciertos++;
            bloquearCartas(cartaUsuario, $carta);
            cartaUsuario = null;
            if (aciertos === 20) {
                ganar();
            }
        }
    }

}



function iniciarJuego() {
    crearTablero();
    iniciarTablero();
    document.querySelectorAll('.carta').forEach(function ($carta) {
        $carta.onclick = manejarInputUsuario;
    });

}

iniciarJuego();























