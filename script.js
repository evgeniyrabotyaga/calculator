const calculatorDisplay = document.querySelector(".output-result");
const inputBtns = document.querySelectorAll(".number");
const clearBtn = document.getElementById("delete");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

const sendNumberValue = function (number) {
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number.textContent;
    awaitingNextValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0"
        ? number.textContent
        : displayValue + number.textContent;
  }
};

const addDecimal = function () {
  if (awaitingNextValue) return;
  if (!calculatorDisplay.textContent.includes("."))
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
};

const useOperator = function (operator) {
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator.dataset.operator;
    return;
  }
  const currentValue = +calculatorDisplay.textContent;
  if (!firstValue) firstValue = currentValue;
  else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  awaitingNextValue = true;
  operatorValue = operator.dataset.operator;
};

const resetAll = function () {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calculatorDisplay.textContent = "0";
};

clearBtn.addEventListener("click", resetAll);

inputBtns.forEach((e) => {
  if (e.dataset.number) e.addEventListener("click", () => sendNumberValue(e));
  else if (e.dataset.operator)
    e.addEventListener("click", () => useOperator(e));
  else if (e.dataset.dot) e.addEventListener("click", () => addDecimal());
});
