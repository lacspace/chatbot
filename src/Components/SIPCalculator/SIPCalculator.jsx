import React, { useState } from 'react';

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [rateOfReturn, setRateOfReturn] = useState('');
  const [investmentPeriod, setInvestmentPeriod] = useState('');
  const [result, setResult] = useState(null);

  const calculateSIP = () => {
    const m = parseFloat(monthlyInvestment);
    const r = parseFloat(rateOfReturn) / 100;
    const n = parseInt(investmentPeriod);
    const numberOfInstallments = n * 12;

    const amount = m * ((Math.pow(1 + r, numberOfInstallments) - 1) / r);
    const investedAmount = m * numberOfInstallments;
    const earnedInterest = amount - investedAmount;

    setResult({
      amount: amount.toFixed(2),
      investedAmount: investedAmount.toFixed(2),
      earnedInterest: earnedInterest.toFixed(2),
    });
  };

  const handleMonthlyInvestmentChange = (e) => {
    setMonthlyInvestment(e.target.value);
  };

  const handleRateOfReturnChange = (e) => {
    setRateOfReturn(e.target.value);
  };

  const handleInvestmentPeriodChange = (e) => {
    setInvestmentPeriod(e.target.value);
  };

  return (
    <div>
      <h2>SIP Calculator</h2>
      <div>
        <label htmlFor="monthlyInvestment">Monthly Investment:</label>
        <input
          type="number"
          id="monthlyInvestment"
          value={monthlyInvestment}
          onChange={handleMonthlyInvestmentChange}
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
      <button onClick={calculateSIP}>Calculate</button>
      {result && (
        <div>
          <p>Amount: {result.amount}</p>
          <p>Invested Amount: {result.investedAmount}</p>
          <p>Earned Interest: {result.earnedInterest}</p>
        </div>
      )}
    </div>
  );
};

export default SIPCalculator;
