import React, { useState } from 'react';

const LumpsumCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rateOfReturn, setRateOfReturn] = useState('');
  const [investmentPeriod, setInvestmentPeriod] = useState('');
  const [result, setResult] = useState(null);

  const calculateLumpsum = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rateOfReturn) / 100;
    const n = parseInt(investmentPeriod);

    const amount = p * Math.pow(1 + r, n);
    const earnedInterest = amount - p;

    setResult({
      amount: amount.toFixed(2),
      earnedInterest: earnedInterest.toFixed(2),
    });
  };

  const handlePrincipalChange = (e) => {
    setPrincipal(e.target.value);
  };

  const handleRateOfReturnChange = (e) => {
    setRateOfReturn(e.target.value);
  };

  const handleInvestmentPeriodChange = (e) => {
    setInvestmentPeriod(e.target.value);
  };

  return (
    <div>
      <h2>Lumpsum Calculator (Indian Market)</h2>
      <div>
        <label htmlFor="principal">Principal Amount:</label>
        <input
          type="number"
          id="principal"
          value={principal}
          onChange={handlePrincipalChange}
        />
      </div>
      <div>
        <label htmlFor="rateOfReturn">Rate of Return (%):</label>
        <input
          type="number"
          id="rateOfReturn"
          value={rateOfReturn}
          onChange={handleRateOfReturnChange}
        />
      </div>
      <div>
        <label htmlFor="investmentPeriod">Investment Period (in years):</label>
        <input
          type="number"
          id="investmentPeriod"
          value={investmentPeriod}
          onChange={handleInvestmentPeriodChange}
        />
      </div>
      <button onClick={calculateLumpsum}>Calculate</button>
      {result && (
        <div>
          <p>Amount: {result.amount}</p>
          <p>Earned Interest: {result.earnedInterest}</p>
        </div>
      )}
    </div>
  );
};

export default LumpsumCalculator;
