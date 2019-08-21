class Calculator {
  constructor() {
    this.history = document.getElementById("history-value");
    this.output = document.getElementById("output-value");
    this.operators = document.querySelectorAll(".operator");
    this.numbers = document.querySelectorAll(".number");
  }
  // History
  getHistory() {
    return this.history.innerText;
  }
  printHistory(num) {
    return (this.history.innerText = num);
  }
  // Output
  getOutput() {
    return this.output.innerText;
  }
  printOutput(num) {
    if (num === "") {
      this.output.innerText = num;
    } else {
      this.output.innerText = this.getFormattedNumber(num);
    }
  }
  // Formatted Number
  getFormattedNumber(num) {
    if (num === "-") {
      return "";
    }
    const n = Number(num);
    const value = n.toLocaleString("en");
    return value;
  }
  // Reverse Number Format
  reverseNumberFormat(num) {
    return Number(num.replace(/,/g, ""));
  }
  // Operators
  runOperator() {
    this.operators.forEach(operator => {
      operator.addEventListener("click", () => {
        switch (operator.id) {
          case "clear":
            this.printHistory("");
            this.printOutput("");
            break;
          case "backspace":
            let output = this.reverseNumberFormat(this.getOutput()).toString();
            // if output has value
            if (output) {
              output = output.substr(0, output.length - 1);
              this.printOutput(output);
            }
            break;
          default:
            let history = this.getHistory();
            let outputValue = this.getOutput();
            if (outputValue === "" && history !== "") {
              if (isNaN(history[history.length - 1])) {
                history = history.substr(0, history.length - 1);
              }
            }
            if (outputValue !== "" || history !== "") {
              // condition
              outputValue =
                outputValue == ""
                  ? outputValue
                  : this.reverseNumberFormat(outputValue);
              history += outputValue;
              if (operator.id === "=") {
                let result = eval(history);
                this.printOutput(result);
                this.printHistory("");
              } else {
                history += operator.id;
                this.printHistory(history);
                this.printOutput("");
              }
            }
            break;
        }
      });
    });
  }
  // Numbers
  runNumber() {
    this.numbers.forEach(number => {
      number.addEventListener("click", () => {
        let output = this.reverseNumberFormat(this.getOutput());
        // if output if number
        if (output !== NaN) {
          output += number.id;
          this.printOutput(output);
        }
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const calculator = new Calculator();
  calculator.runOperator();
  calculator.runNumber();
});
