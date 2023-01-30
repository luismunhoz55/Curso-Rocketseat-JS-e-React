import { Modal } from './modal.js'
import { AlertError } from './alert-error.js'
import { calculateIMC, notNumber } from './utils.js'

// váriaveis
const form = document.querySelector('form')
const inputWeight = document.querySelector('#weight')
const inputHeight = document.querySelector('#height')


form.onsubmit = function (event) {
  event.preventDefault()

  const weight = inputWeight.value
  const height = inputHeight.value

  const weightOrHeightIsNotANumber = notNumber(weight) || notNumber(height)

  if (weightOrHeightIsNotANumber) {
    AlertError.open()
    return
  }

  const IMC = calculateIMC(weight, height)
  const message = `Seu IMC é de ${IMC}`

  Modal.message.innerText = message
  console.log(message)

  Modal.open()

  inputHeight.value = ""
  inputWeight.value = ""

  AlertError.close()

}

window.addEventListener('input', takeAwayErrorMessage)

function takeAwayErrorMessage(event) {
  AlertError.element.classList.remove('open')
}

