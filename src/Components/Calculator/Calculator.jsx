import React, { useState } from "react";
import './Calculator.css'
function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const calculate = (numbers, role) => {
    if (!numbers) return 0;

    let delimiter = ",";
    if (numbers.startsWith("//")) {
      const parts = numbers.split("\\n", 2);
      delimiter = parts[0].substring(2);
      numbers = parts[1];
    }

    const delimitersPattern = new RegExp(`[${delimiter}]|\\n`);
    const tokens = numbers.split(delimitersPattern);

    let sum = role == "mult" || role == "div" ? 1 : 0;
    const negatives = [];
    tokens.forEach((token) => {
      if (token) {
        const num = parseInt(token, 10);
        if (num < 0) negatives.push(num);
        console.log(token);
        if (role == "add") {
          sum += num;
        } else if (role == "sub") {
          sum -= num;
        } else if (role == "mult") {
          sum = sum * num;
        }else if (role === "div") {
          sum = sum === 0 ? num : sum / num;
        }
      }
    });

    if (negatives.length) {
     setError(`Negative numbers not allowed: ${negatives.join(", ")}`);
    }

    return sum;
  };

  const handleCalculate = (role) => {
    try {
      setError("");
      const sum = calculate(input, role);
      setResult(sum);
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div className="calculatorMain">
        <span className="headingCal">Calculator</span>
      <div className="inputDiv">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter numbers"
        />
      </div>
      <div className="btnDiv">
        <button
          onClick={() => {
            handleCalculate("add");
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            handleCalculate("sub");
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            handleCalculate("mult");
          }}
        >
          *
        </button>
        <button
          onClick={() => {
            handleCalculate("div");
          }}
        >
          /
        </button>
      </div> 
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result !== null && !error && <p className="resultVal">Result: {result}</p>}
    </div>
  );
}

export default Calculator;


