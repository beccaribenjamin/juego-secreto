let numeroSecreto = 0;
let intentos = 0;
let numerosSorteados = [];
let numeroMaximo = 10;

console.log(numeroSecreto)


function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento)
    elementoHTML.innerHTML = texto;
}

function asignarEstilo(elemento, bg, color, br) {
    let elementoHTML = document.querySelector(elemento)
    elementoHTML.style.backgroundColor = bg;
    elementoHTML.style.color = color;
    elementoHTML.style.borderRadius = br;
}

const limpiarCaja = (idElement) => {
    document.querySelector(idElement).value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor( Math.random() * numeroMaximo ) + 1;
    console.log(numeroGenerado)
    console.log(numerosSorteados)

    //Si ya sortemaos todos los numeros
    if( numerosSorteados.length === numeroMaximo ){
        asignarTextoElemento('p', 'Ya se sortearon todos los numeros posibles')
    } else{
        //Si el numero esta incluido en la lista
        if (numerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            numerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
    
    
}


const verificarIntento = () => {
    let numeroDeUsuario = document.getElementById('valorUsuario').value;
    if( numeroDeUsuario == numeroSecreto ){
        asignarTextoElemento('p', `Felicidades, adivinaste el numero en ${intentos} ${(intentos === 1 ? 'intento' : 'intentos')}`)  
        asignarEstilo('p', 'green', '', '16px');

        document.getElementById('reiniciar').removeAttribute('disabled')
        document.getElementById('intento').setAttribute('disabled', true)

    } else if ( numeroDeUsuario > numeroSecreto ){
        //El usuario no acerta el numero
        limpiarCaja('#valorUsuario')

        asignarTextoElemento('p', `El numero secreto es menor `)
        asignarEstilo('p', 'yellow', 'black','16px');
    } else {
        asignarTextoElemento('p', `El numero secreto es mayor `)
        asignarEstilo('p', 'yellow', 'black', '16px');
    }
    intentos++;
}

const condicionesIniciales = () => {
    asignarTextoElemento('h1', 'Juego del numero secreto')
    asignarEstilo('h1', 'transparent', 'white');
    asignarTextoElemento('p', `Adivina el numero entre 1 y ${numeroMaximo}`)
    asignarEstilo('p', 'transparent', 'white');
    //Generamos nuevo numero aleatorio
    numeroSecreto = generarNumeroSecreto();
    //Reiniciar Intentos
    intentos = 1
    document.getElementById('intento').removeAttribute('disabled')
    
}

const reiniciarJuego = () => {
    //Limpiamos la caja
    limpiarCaja('#valorUsuario')
    //Volvemos a poner el mensaje inicial, creamos un nuevo numero secreto y reiniciamos los intentos
    condicionesIniciales();
    //Desabilitar boton de nuevo Juego
    document.getElementById('reiniciar').setAttribute('disabled', true)
}


condicionesIniciales()