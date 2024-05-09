const passwordLength = document.getElementById('passwordLength')
const lengthDisplay = document.getElementById('length-display')
const passwordDisplay = document.getElementById('password-display')

const upperCheckBox = document.getElementById('uppercaseLetters')
const lowerCheckBox = document.getElementById('lowercaseLetters')
const numberCheckBox = document.getElementById('numbers')
const symbolCheckBox = document.getElementById('symbols')

const bars = document.querySelectorAll('.bar')
const barText = document.getElementById('bar-text')

const numbers = '0123456789'
const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz'
const symbols = '!@#$%^&*()_+'

const listenForChangeOn = box => {
    box.addEventListener('change', function () {
        console.log(
            upperCheckBox.checked,
            lowerCheckBox.checked,
            numberCheckBox.checked,
            symbolCheckBox.checked
        )
    })
}

passwordLength.addEventListener('input', function () { 
    const value = Number(passwordLength.value)
    lengthDisplay.textContent = value

    const left = (value / 20) * 100
    passwordLength.style.background = `linear-gradient(to right, #a4ffaf ${left}%, #a4ffaf ${left}%, #18171f ${left}%, #18171f 100%)`

    passwordDisplay.style.opacity = value === 0 ? 0.25 : 1
})
listenForChangeOn(upperCheckBox)
listenForChangeOn(lowerCheckBox)
listenForChangeOn(numberCheckBox)
listenForChangeOn(symbolCheckBox)