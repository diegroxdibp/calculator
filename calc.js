//Calculator Areas
let display = document.querySelector('.display')
let scratchpad = document.querySelector('.scratchpad')
//Buttons
const inputNumbers = document.querySelectorAll('.numbers input');
inputNumbers.forEach(number => number.addEventListener('click', function () { display.value += this.value }));
document.querySelector('.equal').addEventListener('click', equality)

//Operators
let operators = document.querySelectorAll('.operation');
operators.forEach(element => element.addEventListener('click', operation));

function operation() {
    let operationSelected = this.value;
    switch (operationSelected) {
        case '+':
            return sum();

        case '-':
            return subtraction();

        case '*':
            return multiplication();

        case '/':
            return division();
    }
}

function sum() {
    let operator = '+';
    parser(operator);
}

function subtraction() {
    let operator = '-';
    parser(operator);
}

function multiplication() {
    let operator = '*';
    parser(operator);
}

function division() {
    let operator = '/';
    parser(operator);
}

function equality() {
    let operator = '=';
    parser(operator);
}

//Clearers
let erase = document.querySelector('.erase').addEventListener('click', eraser)
let clear = document.querySelector('.clear').addEventListener('click', reset)

function eraser() {
    let temp = display.value.slice(0, -1);
    display.value = temp;
}

function reset() {
    while (scratchpad.lastElementChild) {
        scratchpad.removeChild(scratchpad.lastElementChild);
    };
    cleanDisplay();
}

function cleanDisplay() {
    display.value = '';
}

//Miscelanious

function operationToScratchpad(operator) {
    let operatorElement = document.createElement('p');
    operatorElement.classList.add('operator');
    scratchpad.appendChild(operatorElement);
    operatorElement.innerHTML = operator;
}

function numToScratchpad(number) {
    let numberElement = document.createElement('p');
    numberElement.classList.add('number');
    scratchpad.appendChild(numberElement);
    numberElement.innerHTML = number;
}

function zeroCheck(operator) {
    let lastNumberElement = document.querySelectorAll('.number');
    let lastNumber = parseInt(lastNumberElement[lastNumberElement.length - 1].innerHTML);
    if (lastNumber === 0 && operator === '/' && display.value == '0') {
        alert('Você tentou dividir 0 por 0. Vejas mais a respeito no link: \n https://brilliant.org/wiki/what-is-0-0/')
        return true;
    }
}

//Analyze the state of the aplication and move it foward
function parser(operator) {
    if (scratchpad.lastElementChild) {
        //Called when have and operation on scratchboard and then a number and a number on display, it does the last operation on
        // with the the last number and the displayed valued and insert the new selected operation on the scratchpad
        if (scratchpad.lastElementChild.classList.contains('operator') && display.value) {
            let operationsList = document.querySelectorAll('.operator');
            let lastOperation = operationsList[operationsList.length - 1].innerHTML;
            if (operator === '=') {
            console.log(`aqui`)
                equal(lastOperation);
            } else {
                equal(lastOperation);
                operationToScratchpad(operator);
            }

        } else if (scratchpad.lastElementChild.classList.contains('operator')) {
            alert('Uma operação já foi escolhida')
            //At this point the windows calculator starts a new session with the new number put on the input
        } else if (scratchpad.lastElementChild.classList.contains('number') && display.value) {
            if (zeroCheck(operator)) {
                return
            }
            equal(operator)

            //Called when have an result and you click on = with no number on display, will redo last opeartion with last number
        } else if (scratchpad.lastElementChild.classList.contains('number')) {
            let operationsList = document.querySelectorAll('.operator');
            let lastOperation = operationsList[operationsList.length - 1].innerHTML;
            if (lastOperation === '='){
                equal(lastOperation);
            } else {
                operationToScratchpad(operator);
            }
        }
    } else {
        if (display.value) {
            if (operator === '=') {
                return alert('Escolha uma operação para operar este valor')
            }
            numToScratchpad(display.value);
            operationToScratchpad(operator);
            cleanDisplay();
        } else {
            alert('Antes de selecionar uma operação, escolha o numero à ser operado');
        }
    }


}



// Do math with given input
function calc(value1, operation, value2) {
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
            return alert('Escolha uma operação para operar este valor')
    }
}

function equal(operator) {
    if (scratchpad.childElementCount > 1 && display.value) {
        // Used when we already have a number and an operation on scratchpad and a number on display to make the operation
        if (scratchpad.lastElementChild.classList.contains('operator')) {
            // Used as regular equality (number and operation on scratchpad and a number on display to do the opration)
            let operatorsList = document.querySelectorAll('.operator');
            let lastOperator = operatorsList[operatorsList.length - 1].innerHTML;
            let lastNumberElement = document.querySelectorAll('.number');
            let lastNumber = parseInt(lastNumberElement[lastNumberElement.length - 1].innerHTML);
            let result = calc(lastNumber, lastOperator, parseInt(display.value));
            if (lastNumber) {
                numToScratchpad(display.value);
                operationToScratchpad('=');
                numToScratchpad(result);
                cleanDisplay();
            } else {
                reset()
                return alert('Não podemos operar sobre valores infinitos ou inválidos')
            }
            //Called when have a number as last element of scratchpad and click on equal with a number on display
        } else {
            let lastNumberElement = document.querySelectorAll('.number');
            let lastNumber = parseInt(lastNumberElement[lastNumberElement.length - 1].innerHTML);
            if (lastNumber) {
                if (scratchpad.lastElementChild.classList.contains('number') && operator === '=') {
                    return alert('Escolha uma operação para operar este valor')
                }
                let result = calc(lastNumber, operator, parseInt(display.value));
                operationToScratchpad(operator);
                numToScratchpad(display.value);
                operationToScratchpad('=');
                numToScratchpad(result);
                cleanDisplay();

            } else {
                reset()
                return alert('Não podemos operar sobre valores infinitos ou inválidos')
            }
        }
        //Called when last elements of scratchpad is a number and then an operator, it redo the last operation when click on =
    } else if (scratchpad.lastElementChild.classList.contains('number')) {
        let operationElement = document.querySelectorAll('.operator');
        let operation = operationElement[operationElement.length - 2].innerHTML;
        let lastNumberElement = document.querySelectorAll('.number');
        let lastNumber = parseInt(lastNumberElement[lastNumberElement.length - 2].innerHTML);
        let lastResultElement = document.querySelectorAll('.number');
        let lastResult = parseInt(lastResultElement[lastResultElement.length - 1].innerHTML);
        let result = calc(lastResult, operation, parseInt(lastNumber));
        operationToScratchpad(operation);
        numToScratchpad(lastNumber);
        operationToScratchpad('=');
        numToScratchpad(result);
        cleanDisplay();
    } else {
        alert('Adicione um valor para que a operação possa ser executada');
    }
}