// selecionando os elementos HTML
const divisao = document.querySelector(".divisao")
const apagaEnter = document.querySelector("#apaga-e-enter")
const peimeiralinha = document.querySelector("#primeira-linha")
const segundalinha = document.querySelector("#seundalinha")
const terceiralinha = document.querySelector("#terceira-linha")

// Definindo as teclas
const teclaprimeiralinha = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',]
const teclaSegundalinha = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',]
const teclaterceiralinha = ['Z', 'X', 'C', 'V', 'B', 'N', 'M',]

// Definindo as Variáveis do jogo
const linha = 6
const coluna = 5
let linhaAtual = 0
let colunaAtual = 0

// Definindo o array da palavras
let palavras = ['SENAI', 'NOITE', 'MILHO', 'LETRA', 'MOUSE']

// seleciona uma palavra aleatória dentro do array palavras e guarda na variável palavra
let palavra = palavras[Math.floor(Math.random() * palavras.length)]

let palavraMapa = {}
for(let i = 0; i < palavra.length; i++) {
    // Separa as letras da palavra
    palavraMapa[palavra[i]] //Separa cada letra em uma posiçao do palavra Mapa -- palavraMapa['S', 'E', 'N', 'A', 'I',]
}
const tentativas = []

// criando a grande de caixas de texto 
for(let linhaindex = 0; linhaindex < linha; linhaindex++) {
    // Vai montar as linhas 
    tentativas[linhaindex] = new Array(coluna) //cria um novo array com o número total de Colunas
    const divisaolinha = document.createElement('div') //cria um nova div
    divisaolinha.setAttribute('id', 'linha'+linhaindex) //Define o atributo ID
    divisaolinha.setAttribute( 'class', 'div-linha')
    for(let colunaindex = 0; colunaindex < coluna; colunaindex++) {
        // Vai montar as colunas
        const divisaoColuna = document.createElement('div')
        divisaoColuna.setAttribute('id', 'linha'+linhaindex+'coluna'+colunaindex)
        let classColuna;
        if (linhaindex === 0) {
            classColuna = 'div-coluna digitando'
        } else {
            classColuna = 'div-coluna desativado'
        }
        divisaoColuna.setAttribute('class', classColuna)
        divisaolinha.append(divisaoColuna) //Adiciona a coluna como filho da linha
        tentativas[linhaindex][colunaindex] = '' //A tentativa começa Vazia
    }
    divisao.append(divisaolinha) //Adicionalinha como filho da divisao
}

const checktentativa = () => {
    const tentativa = tentativas[linhaAtual].join('') //cria um objeto a partir dp Array 'tentativas' usando o metodo join
    if(tentativa.length !== coluna) {
        //Verifica se já foi colocando uma letra (tentativa) na coluna
        return
    }
    let atColuna = document.querySelectorAll('.digitando')
    for(let i = 0; i<coluna; i++) {
        const letra = tentativa[index] //Seleciona a letra correspondente a coluna atual
        if(palavraMapa[letra] === undefined) {
            // Verifica se a letra atuel não existe no palavraMap
            atColuna[i].classList.add('arrado')
        } else {
            if(palavraMapa[letra] === i) {
                atColuna[i].classList.add('certo')
            } else {
                atColuna[i].classList.add('deslocada')
            }
        }
    }
    if(tentativa === palavra) {
        window.alert('parabéns, Você conseguiu')
        return
    } else {
        if (linhaAtual === linha-1) {
            //Verifica se todas as linhas já foram
            window.alert('Errou')
        } else {
            proximalinha()
        }
    }
}

const proximalinha = () => {
    let digColuna = document.querySelectorAll('.digitando')
    // Seleciona todos os elementos com a classe digitando
    for(let i = 0; i<digColuna; i++) {
        digColuna[i].classList.remove('digitando')
        digColuna[i].classList.add('desativado')
    }
linhaAtual++
colunaAtual = 0
// linhaAtual++ para ir para a proxima linha e a coluna volta a ser 0 para ser a primeira caixinha de linha

const linhaAtualElemento = document.querySelector('#linha'+linhaAtual)
let atColuna = linhaAtualElemento.querySelectorAll('.div-coluna')
for(let i = 0; i<atColuna.length; i++) {
    atColuna[i]. classList.add('digitando')
} 
}
 //Vai pegar as teclas digitadas -- key é uma palavra para keyboard, as teclas do teclado
 const tecladoOnClick = key => {
    if(colunaAtual === coluna) {
        //Verifica se acabou as colunas
        return
    }
    const divAtual = document.querySelectorAll('#linha' +linhaAtual+'colunaAtual')
    divAtual.textContent = key //o conteudo do texto será igual a tecla digitada
    tentativas[linhaAtual][colunaAtual] = key
    colunaAtual++
 }

 const criarlinhaTeclado = (keys, linhaTeclado) => {
    keys.forEach(key => {
        // Vai ler todas as reclas
        let botaoELemento = document.createElement('button') //vai criar os botões
        botaoELemento.textContent = key
        botaoELemento.setAttribute('id',key)
        botaoELemento.addEventListener('click',() => tecladoOnClick(key)) 
        linhaTeclado.append(botaoELemento)
    })
 }

 criarlinhaTeclado(teclaprimeiralinha, primeiraLinha)
 criarlinhaTeclado(teclaSegundalinha, segundalinha)
 criarlinhaTeclado(teclaterceiralinha, terceiralinha)

 const backspace = () => {
    if(colunaAtual === 0) {
        return
    }
    colunaAtual--
    tentativas[linhaAtual][colunaAtual] = '' //o quadrado volta a ficar vazio
    const div = document.querySelector('#linha'+linhaAtual+'coluna'+colunaAtual)
    div.textContent = ''
 }

 // Criar o botao de apagar e enter
 const backspacebotao = document.createElement('button')
 backspacebotao.addEventListener('click', backspace)
 backspacebotao.textContent = '<x'
apagaEnter.append(backspacebotao)

const enterBotao = document.createElement('button')
enterBotao.addEventListener('click', checktentativa)
enterBotao.textContent = 'ENTER'
apagaEnter.append(backspacebotao)

document.onkeydown = function(e) {
    e = e || window.e
    if (e.key === 'Enter') {
        checktentativa()
    } else if (e.key === 'Backspece') {
        backspace()
    } else {
        tecladoOnClick(e.key.toUpperCase())
    }
    }







