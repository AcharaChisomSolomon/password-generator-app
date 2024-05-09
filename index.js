const passwordLength = document.getElementById('passwordLength')
const lengthDisplay = document.getElementById('length-display')
const passwordDisplay = document.getElementById('password-display')
const copyBtn = document.getElementById('copy-btn')
const copyText = document.getElementById('copy-text')

const upperCheckBox = document.getElementById('uppercaseLetters')
const lowerCheckBox = document.getElementById('lowercaseLetters')
const numberCheckBox = document.getElementById('numbers')
const symbolCheckBox = document.getElementById('symbols')
const generateBtn = document.getElementById('generate')

const bars = document.getElementById('bars')
const barText = document.getElementById('bar-text')

const numbers = '0123456789'
const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz'
const symbols = '!@#$%^&*()_+'
const strengthObject = {
    1: ['too weak!', 'level1'],
    2: ['weak', 'level2'],
    3: ['medium', 'level3'],
    4: ['strong', 'level4']
}
const defaultPassword = passwordDisplay.textContent
let currentPassword = defaultPassword

const defaultBars = () => {
    barText.textContent = ''
    bars.innerHTML = ''
    for (let i = 0; i < 4; i++) {
        bars.innerHTML += `<div class="bar"></div>`
    }
}

const updateBars = level => {
    barText.textContent = strengthObject[level][0]
    bars.innerHTML = ''
    for (let i = 0; i < 4; i++) {
        if (i >= level) {
            bars.innerHTML += `<div class="bar"></div>`
            continue
        }
        bars.innerHTML += `<div class="bar ${strengthObject[level][1]}"></div>`
    }
}

const isInDefaultState = () => {
    const isDefault = passwordLength.value === '0' || (!upperCheckBox.checked && !lowerCheckBox.checked && !numberCheckBox.checked && !symbolCheckBox.checked)
    if (isDefault) {
        defaultBars()
    }
    return isDefault
}

const calculatePasswordStrength = password => {
    let strength = 0;

    if (password.length >= 8) {
        strength++;
    }

    if (/[A-Z]/.test(password) || /[a-z]/.test(password)) {
        strength++;
    }
    if (/[0-9]/.test(password)) {
        strength++;
    }
    if (/[^A-Za-z0-9]/.test(password)) {
        strength++;
    }

    return Math.min(strength, 4);
}

const randomizeString = str => {
    let arr = str.split('');

    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    str = arr.join('');
    return str;
}

const generatePassword = () => { 
    let password = ''
    let i = 0
    while (i < Number(passwordLength.value)) { 
        if (upperCheckBox.checked) {
            password += upperLetters[Math.floor(Math.random() * upperLetters.length)]
            i++
        }
        if (lowerCheckBox.checked) {
            password += lowerLetters[Math.floor(Math.random() * lowerLetters.length)]
            i++
        }
        if (numberCheckBox.checked) {
            password += numbers[Math.floor(Math.random() * numbers.length)]
            i++
        }
        if (symbolCheckBox.checked) {
            password += symbols[Math.floor(Math.random() * symbols.length)]
            i++
        }
    }
    password = password.slice(0, Number(passwordLength.value))
    return randomizeString(password)
}

const displayPassword = () => { 
    if (isInDefaultState()) {
        passwordDisplay.textContent = defaultPassword
        passwordDisplay.style.opacity = 0.25
        return
    }

    currentPassword = generatePassword()
    passwordDisplay.textContent = currentPassword
    passwordDisplay.style.opacity = 1
    updateBars(calculatePasswordStrength(currentPassword))
}

copyBtn.addEventListener('click', function () {
    if (isInDefaultState()) return

    navigator.clipboard.writeText(currentPassword)
        .then(() => {
            copyText.textContent = 'COPIED'
            setTimeout(() => {
                copyText.textContent = ''
            }, 3000)
        })
})

const listenForChangeOn = box => {
    box.addEventListener('change', function () {
        displayPassword()
    })
}

generateBtn.addEventListener('click', function () {
    displayPassword()
})

passwordLength.addEventListener('input', function () { 
    const value = Number(passwordLength.value)
    lengthDisplay.textContent = value

    const left = (value / Number(passwordLength.max)) * 100
    passwordLength.style.background = `linear-gradient(to right, #a4ffaf ${left}%, #a4ffaf ${left}%, #18171f ${left}%, #18171f 100%)`

    displayPassword()
})
listenForChangeOn(upperCheckBox)
listenForChangeOn(lowerCheckBox)
listenForChangeOn(numberCheckBox)
listenForChangeOn(symbolCheckBox)