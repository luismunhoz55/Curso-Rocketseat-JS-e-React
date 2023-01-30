let randomNumber = Math.floor(Math.random() * 11)
let cont = 0
console.log(randomNumber)

const screen1 = document.querySelector(".screen1")
const screen2 = document.querySelector(".screen2")

const buttonTry = document.querySelector('#buttonTry')
const buttonRetry = document.querySelector('#buttonRetry')

// Função callback - vai ser chamada depois
function handleTryClick(event) {
  event.preventDefault()

  cont++

  const inputNumber = document.querySelector("#inputNumber").value

  if (inputNumber == randomNumber) {

    togleScreen()
    let word = cont > 1 ? "tentativas" : "tentativa"

    document.querySelector(".screen2 h2").innerText = `Acertou em ${cont} ${word}`
  }

  document.querySelector("#inputNumber").value = ""
}

function handleRetryClick() {
  togleScreen()
  cont = 0
}

function togleScreen() {
  screen1.classList.toggle('hide')
  screen2.classList.toggle('hide')
}

buttonTry.addEventListener('click', handleTryClick)
buttonRetry.addEventListener('click', handleRetryClick)