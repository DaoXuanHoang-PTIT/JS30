const display = document.querySelector('.hien-thi');
const buttons = document.querySelectorAll('.nut-bam button');

let currentInput = '';
let operator = '';
let firstInput = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (!isNaN(value) || value === '.') {
      currentInput += value;
      display.value = firstInput + operator + currentInput;
    } else if (value === 'C') {
      clearCalculator();
    } else if (value === '=') {
      calculate();
    } else {
      handleOperator(value);
    }
  });
});

function handleOperator(op) {
  if (currentInput === '') return;

  if (firstInput !== '') {
    calculate();
  }

  operator = op;
  firstInput = currentInput;
  currentInput = '';
  display.value = firstInput + operator + currentInput;
}

function calculate() {
  if (currentInput === '') return;

  let result;
  const prev = parseFloat(firstInput);
  const current = parseFloat(currentInput);

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case 'x':
      result = prev * current;
      break;
    case '/':
      if (current === 0) {
        result = 'error';
      } else {
        result = prev / current;
      }
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = '';
  firstInput = '';
  display.value = currentInput;
}

function clearCalculator() {
  currentInput = '';
  operator = '';
  firstInput = '';
  display.value = '';
}
