const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

const result = document.querySelector('#result');
const history = document.querySelector('#history');

const clear = document.querySelector('#clear');
const sign = document.querySelector('#sign');

let numOne = '';
let numTwo = '';
let op = '';
let isOldRes = false;
let isDone = false;

function numberClick(e) {
    if (isDone) {
        clearAll()
    }
    else if (isOldRes) {
        result.textContent = '';
        isOldRes = false;
    }
    let num = e.target.textContent;
    result.textContent += num;
}

function clearAll() {
    result.textContent = '';
    history.textContent = '';
    numOne = '';
    numTwo = '';
    isDone = false;
    isOldRes = false;
}

function changeSign() {
    let res = Number(result.textContent) * -1;
    result.textContent = res;
}

function operatorClick(e) {
    let operator = e.target.id;
    history.textContent += result.textContent + e.target.textContent;

    if (numOne === '') {
        numOne = result.textContent;
        op = operator;
        result.textContent = '';
    } else {
        numTwo = result.textContent;
        let res = operate(numOne, numTwo, op);
        result.textContent = res;

        if (operator == '=') {
            isDone = true;
            numOne = '';
            numTwo = '';
            op = '';
        } else {
            numOne = res;
            numTwo = '';
            op = operator;
            isOldRes = true;
        }
    }
}

numbers.forEach(number => number.addEventListener('click', numberClick));
clear.addEventListener('click', clearAll);
sign.addEventListener('click', changeSign);
operators.forEach(operator => operator.addEventListener('click', operatorClick));

function operate(one, two, op) {
    one = Number(one);
    two = Number(two);
    let res;
    switch (op) {
        case '+':
            res = one + two;
            break;
        case '-':
            res = one - two;
            break;
        case '*':
            res = one * two;
            break;
        case '/':
            res = one / two;
            break;
        case '%':
            res = one % two;
            break;
    }
    return res;
}