import { useState } from "react";

export default function App() {
  return (
    <div className="app">
      <Header />
      <Main />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <img src="images/logo.svg" alt="Logo" className="header__logo" />
    </header>
  );
}

function Main() {
  return (
    <div className="main">
      <Calculator />
    </div>
  );
}
function Calculator() {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercentage, setTipPercentage] = useState(0);
  const [tipPerPerson, setTipPerPerson] = useState("0.00");
  const [totalPerPerson, setTotalPerPerson] = useState("0.00");
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const calculateTotals = (bill, percentage) => {
    const parsedBill = parseFloat(bill);
    const parsedPercentage = parseFloat(percentage);
    if (isNaN(parsedBill) || isNaN(parsedPercentage)) {
      // Gestion des entrées non valides
      setTipPerPerson("0.00");
      setTotalPerPerson("0.00");
      return;
    }
    const tipAmount = (parsedBill * parsedPercentage) / 100;
    const totalAmount = parsedBill + tipAmount;
    setTipPerPerson(tipAmount.toFixed(2));
    setTotalPerPerson(totalAmount.toFixed(2));
  };

  const handleBillAmountChange = (event) => {
    setBillAmount(event.target.value);
    calculateTotals(event.target.value, tipPercentage);
  };

  const handleTipButtonClick = (percentage) => {
    const sanitizedPercentage = parseFloat(percentage) || 0; // Sanitize input for safety
    setTipPercentage(sanitizedPercentage);
    calculateTotals(billAmount, sanitizedPercentage);
  };

  const handleNumberOfPeopleChange = (event) => {
    const numPeople = parseInt(event.target.value, 10);
    if (numPeople > 0) {
      setNumberOfPeople(numPeople);
    } else {
      setNumberOfPeople(1);
    }
  };

  return (
    <div className="calculator">
      <InputSection
        billAmount={billAmount}
        onBillAmountChange={handleBillAmountChange}
        numberOfPeople={numberOfPeople}
        onNumberOfPeopleChange={handleNumberOfPeopleChange}
        onTipButtonClick={handleTipButtonClick}
      />
      <OutputSection
        numberOfPeople={numberOfPeople}
        tipPerPerson={tipPerPerson}
        totalPerPerson={totalPerPerson}
        setBillAmount={setBillAmount}
        setTipPerPerson={setTipPerPerson}
        setTipPercentage={setTipPercentage}
        setTotalPerPerson={setTotalPerPerson}
        setNumberOfPeople={setNumberOfPeople}
      />
      ;
    </div>
  );
}

function InputSection({
  billAmount,
  onBillAmountChange,
  numberOfPeople,
  onNumberOfPeopleChange,
  onTipButtonClick, // Receive the handler btn here
}) {
  return (
    <div className="calculator__input-section">
      <label htmlFor="billAmount" className="calculator__label">
        Bill
      </label>

      <div className="input-icon-wrapper">
        <input
          type="text"
          id="billAmount"
          className="calculator__input"
          value={billAmount}
          onChange={onBillAmountChange}
        />

        <img src="images/icon-dollar.svg" className="input-icon" alt="dollar" />
      </div>

      <p className="calculator__subheading">Select Tip %</p>

      <CalculatorButtons onTipButtonClick={onTipButtonClick} />

      <div className="calculator__label-container">
        <label htmlFor="numberOfPeople" className="calculator__label">
          Number of People
        </label>
      </div>
      <div className="input-icon-wrapper">
        <input
          type="text"
          id="numberOfPeople"
          className="calculator__input"
          value={numberOfPeople}
          onChange={onNumberOfPeopleChange}
        />
        <img src="images/icon-person.svg" className="input-icon" alt="dollar" />
      </div>
    </div>
  );
}

function OutputSection({
  numberOfPeople,
  tipPerPerson,
  totalPerPerson,
  setBillAmount,
  setTipPerPerson,
  setTipPercentage,
  setTotalPerPerson,
  setNumberOfPeople,
}) {
  const resetCalculator = () => {
    if (typeof setBillAmount !== "function") {
      console.error("setBillAmount is not a function");
      return;
    }

    setBillAmount("0");
    setTipPercentage(0);
    setTipPerPerson("0.00");
    setTotalPerPerson("0.00");
    setNumberOfPeople(1);
  };
  const safeNumberOfPeople = numberOfPeople || 1;
  return (
    <div className="calculator__output-section">
      <div className="calculator__output-amount">
        <div className="calculator__tip-amount">
          <div className="calculator__description-wrapper">
            <p className="calculator__description">Tip Amount</p>

            <span className="calculator__per-person">/ person</span>
          </div>
          <p className="calculator__money">
            ${(tipPerPerson / safeNumberOfPeople).toFixed(2)}
          </p>
        </div>

        <div className="calculator__total-amount">
          <div className="calculator__description-wrapper">
            <p className="calculator__description">Total</p>
            <span className="calculator__per-person">/ person</span>
          </div>
          <p className="calculator__money">
            ${(totalPerPerson / safeNumberOfPeople).toFixed(2)}
          </p>
        </div>
      </div>
      <button
        id="resetButton"
        className="calculator__reset-button"
        onClick={resetCalculator}
      >
        reset
      </button>
    </div>
  );
}

function CalculatorButtons({ onTipButtonClick }) {
  const tips = [5, 10, 15, 25, 50];

  const [activeTip, setActiveTip] = useState(null);

  const handleButtonClick = (tip) => {
    setActiveTip(tip);
    onTipButtonClick(tip);
  };

  return (
    <div className="calculator__buttons">
      {tips.map((tip) => (
        <button
          key={tip}
          className="calculator__button"
          onClick={() => handleButtonClick(tip)}
          style={{
            backgroundColor:
              activeTip === tip ? "#9fe8df" : "hsl(183, 100%, 15%)",
            color: activeTip === tip ? "hsl(183, 100%, 15%)" : "white",
          }}
        >
          {tip}%
        </button>
      ))}

      <input
        type="text"
        placeholder="Custom"
        className="calculator__button calculator__button--custom"
        onChange={(e) => onTipButtonClick(e.target.value)}
      />
    </div>
  );
}
