const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBT = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarBtIcone = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer');
const musica = new Audio ('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio ('/sons/play.wav');
const audioPausa = new Audio ('/sons/pause.mp3');
const audioTempoFinalizado = new Audio ('/sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    }else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    /*html.setAttribute('data-contexto', 'foco')
    banner.setAttribute('src', 'imagens/foco.png')*/
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');

})

curtoBt.addEventListener('click', () => {
    /*html.setAttribute('data-contexto', 'descanso-curto')
    banner.setAttribute('src', 'imagens/descanso-curto.png')*/
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
    
})

longoBT.addEventListener('click',() => {
    /*html.setAttribute('data-contexto', 'descanso-longo')
    banner.setAttribute('src', 'imagens/descanso-longo.png')*/
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBT.classList.add('active');
})

//Com a funcao abaixo otimizamos o codigo. A versao basica permanece comentada acima
function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
//abaixo codamos a mudanca dinamica de texto de acordo com o contexto    
switch (contexto) {
    case 'foco':
        titulo.innerHTML = `
        Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong>
        `
        break;
    case 'descanso-curto':
        titulo.innerHTML = `
        Que tal dar uma respirada?<br>
        <strong class="app__title-strong">Faça uma pausa curta!</strong>
        `    
        break;
    case 'descanso-longo':
        titulo.innerHTML = `
        Hora de voltar à superfície.<br>
        <strong class="app__title-strong">Faça uma pausa longa.</strong>
        `
    default:
        break;
}

}
const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        //audioTempoFinalizado.play()
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo()
   
}
startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar (){
    if(intervaloId){
        audioPausa.play()
        zerar()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = ('Pausar');
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/pause.png`)
}

function zerar () {
    clearInterval(intervaloId) //Aqui estamos parando e limpando a contagem regressiva
    intervaloId = null // aqui null tem a funcao de limpar o log para que o alert nao fique aparecendo
    iniciarOuPausarBt.textContent = ('Iniciar');
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/play_arrow.png`)
}
function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000) // * mil pq se usa milesegundos
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'}) //aqui formatamos o tempo em 00m:00s
    tempoNaTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo()