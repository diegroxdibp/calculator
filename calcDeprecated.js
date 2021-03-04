//Nr buttons
const inputNumbers = document.querySelectorAll('.numbers input');
inputNumbers.forEach(number => number.addEventListener('click', function () { display.value += this.value }));

//Display
let display = document.querySelector('.display')

//Clearers
let erase = document.querySelector('.erase').addEventListener('click', eraser)
let clear = document.querySelector('.clear').addEventListener('click', reset)

function eraser() {
    let temp = display.value.slice(0, -1);
    display.value = temp;
}

function reset() {
    cleanDisplay()
    while (scratchpad.lastElementChild) {
        scratchpad.removeChild(scratchpad.lastElementChild);
    }
    document.querySelector('.result').remove();
}

function cleanDisplay() {
    display.value = '';
}

//Operations
document.querySelector('.sum').addEventListener('click', sum)
document.querySelector('.subtraction').addEventListener('click', subtraction)
document.querySelector('.multiplication').addEventListener('click', multiplication)
document.querySelector('.division').addEventListener('click', division)
document.querySelector('.equal').addEventListener('click', equal)
let displayFilled = () => { return display.value ? true : false; }
let scratchpad = document.querySelector('.scratchpad')
let resultWrapper = document.querySelector('.resultWrapper')


function sum() {
    let operation = '+';
    if (display.value) {
        let nr = parseInt(display.value);
        parser(nr, operation);

    } else { alert('Insira um valor!') }
}

function subtraction() {
    let operation = '-';
    if (display.value) {
        let nr = parseInt(display.value);
        parser(nr, operation);

    } else { alert('Insira um valor!') }
}

function multiplication() {
    let operation = '*';
    if (display.value) {
        let nr = parseInt(display.value);
        parser(nr, operation);

    } else { alert('Insira um valor!') }
}

function division() {
    let operation = '/';
    if (display.value) {
        let nr = parseInt(display.value);
        parser(nr, operation);

    } else { alert('Insira um valor!') }
}

function equal() {
    let operation = '=';
    if (display.value) {
        let nr = parseInt(display.value);
        parser(nr, operation);

    } else { alert('Insira um valor!') }
}

function parser(nr, operation) {
    parcial = document.querySelectorAll('.parcial')



    if (parcial.length > 0) {
        if (operation === '=') {
            lastParcial = document.querySelectorAll('.parcial')[parcial.length - 1];
            lastParcialNr = parseInt(lastParcial.innerHTML);
            lastOperation = lastParcial.innerHTML.charAt(0);
            let result = operator(lastParcialNr,     operation, nr, lastOperation)
            console.log(result);
            let resultNew = document.createElement('p');
            resultNew.classList.add('result');
            resultWrapper.appendChild(resultNew);
            resultNew.innerHTML = operation + result;
            return

        }
        let parcialNew = document.createElement('p');
        parcialNew.classList.add('parcial');
        scratchpad.appendChild(parcialNew);
        parcialNew.innerHTML = operation + nr;

        let result = document.querySelector('.result')
        if (result) {
            let resultOld = parseInt(result.innerHTML);

            parcialResultado = operator(resultOld, operation, nr);

            result.innerHTML = parcialResultado + '=';

        } else if (parcial.length === 1) {
            let resultNew = document.createElement('p');
            resultNew.classList.add('result');
            resultWrapper.appendChild(resultNew);

            let firstNum = parseInt(parcial[0].innerHTML);

            parcialResultado = operator(firstNum, operation, nr);

            resultNew.innerHTML = parcialResultado + '=';
        }
        cleanDisplay();
    } else {


        let parcialNew = document.createElement('p');
        parcialNew.classList.add('parcial');
        scratchpad.appendChild(parcialNew);
        parcialNew.innerHTML = nr;
        cleanDisplay();
    }
}

function operator(value1, operation, value2, lastOperation) {
    switch (operation) {
        case '+':
            return value1 + value2;

        case '-':
            return value1 - value2;

        case '*':
            return value1 * value2;

        case '/':
            return value1 / value2;

        case '=':

            switch (lastOperation) {
                case '+':
                    return value1 + value2;

                case '-':
                    return value1 - value2;

                case '*':
                    return value1 * value2;

                case '/':
                    return value1 / value2;
            }
    }
}