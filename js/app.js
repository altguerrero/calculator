// History
function getHistory() {
  return document.getElementById("history-value").innerText;
}
function printHistory(num) {
  return (document.getElementById("history-value").innerText = num);
}
// Output
function getOutput() {
  return document.getElementById("output-value").innerText;
}
function printOutput(num) {
  if (num === "") {
    document.getElementById("output-value").innerText = num;
  } else {
    document.getElementById("output-value").innerText = getFormattedNumber(num);
  }
}
// Formatted Number
function getFormattedNumber(num) {
  if (num === "-") {
    return "";
  }
  const n = Number(num);
  const value = n.toLocaleString("en");
  return value;
}
// Reverse Number Format
function reverseNumberFormat(num) {
  return Number(num.replace(/,/g, ""));
}
// Operators
const operators = document.querySelectorAll(".operator");
operators.forEach(operator => {
  operator.addEventListener("click", () => {
    switch (operator.id) {
      case "clear":
        printHistory("");
        printOutput("");
        break;
      case "backspace":
        let output = reverseNumberFormat(getOutput()).toString();
        // if output has value
        if (output) {
          output = output.substr(0, output.length - 1);
          printOutput(output);
        }
        break;
      default:
        let history = getHistory();
        let outputValue = getOutput();
        if (outputValue === "" && history !== "") {
          if (isNaN(history[history.length - 1])) {
            history = history.substr(0, history.length - 1);
          }
        }
        if (outputValue !== "" || history !== "") {
          // condition
          outputValue =
            outputValue == "" ? outputValue : reverseNumberFormat(outputValue);
          history += outputValue;
          if (operator.id === "=") {
            let result = eval(history);
            printOutput(result);
            printHistory("");
          } else {
            history += operator.id;
            printHistory(history);
            printOutput("");
          }
        }
        break;
    }
  });
});
// Numbers
const numbers = document.querySelectorAll(".number");
numbers.forEach(number => {
  number.addEventListener("click", () => {
    let output = reverseNumberFormat(getOutput());
    // if output if number
    if (output !== NaN) {
      output += number.id;
      printOutput(output);
    }
  });
});
