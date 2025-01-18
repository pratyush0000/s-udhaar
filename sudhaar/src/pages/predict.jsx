import React, { useState } from 'react';
import axios from 'axios';
import styles from './predict.module.css';

const LoanPrediction = () => {
  const [input, setInput] = useState({
    person_age: '',
    person_income: '',
    person_home_ownership: '',
    person_emp_length: '',
    loan_intent: '',
    loan_grade: '',
    loan_amnt: '',
    loan_int_rate: '',
    loan_percent_income: '',
    cb_person_default_on_file: '',
    cb_person_cred_hist_length: '',
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        person_age: Number(input.person_age),
        person_income: Number(input.person_income),
        person_home_ownership: input.person_home_ownership,
        person_emp_length: Number(input.person_emp_length),
        loan_intent: input.loan_intent,
        loan_grade: input.loan_grade,
        loan_amnt: Number(input.loan_amnt),
        loan_int_rate: Number(input.loan_int_rate),
        loan_percent_income: Number(input.loan_percent_income),
        cb_person_default_on_file: input.cb_person_default_on_file,
        cb_person_cred_hist_length: Number(input.cb_person_cred_hist_length),
      };

      const response = await axios.post('http://localhost:5000/predict', data, {
        headers: { 'Content-Type': 'application/json' },
      });

      setPrediction(response.data.prediction === 1 ? 'Loan Approved' : 'Loan Not Approved');
    } catch (error) {
      console.error('Error making prediction:', error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <h2>Loan Prediction</h2>
        <form onSubmit={handleSubmit}>
          <input type="number" name="person_age" value={input.person_age} onChange={handleChange} placeholder="Age" />
          <input type="number" name="person_income" value={input.person_income} onChange={handleChange} placeholder="Income" />

          <select name="person_home_ownership" value={input.person_home_ownership} onChange={handleChange}>
            <option value="">Select Home Ownership</option>
            <option value="RENT">RENT</option>
            <option value="OWN">OWN</option>
            <option value="MORTGAGE">MORTGAGE</option>
            <option value="OTHER">OTHER</option>
          </select>

          <input type="number" name="person_emp_length" value={input.person_emp_length} onChange={handleChange} placeholder="Employment Length" />

          <select name="loan_intent" value={input.loan_intent} onChange={handleChange}>
            <option value="">Select Loan Intent</option>
            <option value="EDUCATION">EDUCATION</option>
            <option value="MEDICAL">MEDICAL</option>
            <option value="VENTURE">VENTURE</option>
            <option value="PERSONAL">PERSONAL</option>
            <option value="HOMEIMPROVEMENT">HOMEIMPROVEMENT</option>
            <option value="DEBTCONSOLIDATION">DEBTCONSOLIDATION</option>
          </select>

          <select name="loan_grade" value={input.loan_grade} onChange={handleChange}>
            <option value="">Select Loan Grade</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
          </select>

          <input type="number" name="loan_amnt" value={input.loan_amnt} onChange={handleChange} placeholder="Loan Amount" />
          <input type="number" name="loan_int_rate" value={input.loan_int_rate} onChange={handleChange} placeholder="Interest Rate" />
          <input type="number" name="loan_percent_income" value={input.loan_percent_income} onChange={handleChange} placeholder="Loan % of Income" />

          <select name="cb_person_default_on_file" value={input.cb_person_default_on_file} onChange={handleChange}>
            <option value="">Default on File</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>

          <input type="number" name="cb_person_cred_hist_length" value={input.cb_person_cred_hist_length} onChange={handleChange} placeholder="Credit History Length" />

          <button type="submit">Predict</button>
        </form>

        {prediction && <p>{prediction}</p>}
      </div>
      <div className={styles.rightColumn}>
        <h3>Prediction Result: {prediction}</h3>
      </div>
    </div>
  );
};

export default LoanPrediction;
