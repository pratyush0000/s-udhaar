import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
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
  const [analysis, setAnalysis] = useState(null);

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

      setPrediction(response.data.prediction === 1 ? 'Loan Request Denied' : 'Loan Request Approved');
    } catch (error) {
      console.error('Error making prediction:', error.response?.data || error.message);
    }
  };

  const handleAnalysis = async () => {
    try {
      const openaiKey = import.meta.env.VITE_OPENAI_API_KEY; // Load your API key
  
      if (!openaiKey) {
        console.error('OpenAI API key is missing.');
        setAnalysis('Analysis failed due to missing API key.');
        return;
      }
  
      // Include the prediction result in the prompt
      const resultDescription =
        prediction === 'Loan Request Approved'
          ? 'The prediction suggests the loan will likely be approved.'
          : 'The prediction suggests the loan will likely be denied.';
  
      const prompt = `Analyze the following loan application data: ${JSON.stringify(
        input,
        null,
        2
      )}. The prediction result is: ${resultDescription}. Provide insights and tell if there are any significant reasons for approval or denial. In case of approval, tell what are the strong points but still if it gets rejected, what should they focus on as this is just a prediction. In case of denial, tell the biggest reason why it might get denied and what other things can be done to improve it. Remember this is a prediction and you are replying as the analyst so never guarentee but always help. Keep it short and dont try to make any text bold. keep all text plain.`;
  
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a financial assistant analyzing loan applications. Your responses will be displayed on a website, so avoid sounding like a bot. Provide precise and professional feedback. Highlight strong points if the loan is approved, and for rejections, suggest how the applicant can improve their chances of approval. Be concise and clear.`,
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 300,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openaiKey}`,
          },
        }
      );
  
      setAnalysis(response.data.choices[0]?.message?.content?.trim() || 'No analysis available.');
    } catch (error) {
      console.error('Error during analysis:', error.response?.data || error.message);
      setAnalysis('Analysis failed. Please try again later.');
    }
  };
  
  
  

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          <h1>Get Predictions Now</h1>
          <p>Give us some information, we will do the rest</p>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="number"
              name="person_age"
              value={input.person_age}
              onChange={handleChange}
              placeholder="Age"
            />
            <input
              type="number"
              name="person_income"
              value={input.person_income}
              onChange={handleChange}
              placeholder="Income"
            />

            <select
              name="person_home_ownership"
              value={input.person_home_ownership}
              onChange={handleChange}
            >
              <option value="">Select Home Ownership</option>
              <option value="RENT">RENT</option>
              <option value="OWN">OWN</option>
              <option value="MORTGAGE">MORTGAGE</option>
              <option value="OTHER">OTHER</option>
            </select>

            <input
              type="number"
              name="person_emp_length"
              value={input.person_emp_length}
              onChange={handleChange}
              placeholder="Employment Length"
            />

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

            <input
              type="number"
              name="loan_amnt"
              value={input.loan_amnt}
              onChange={handleChange}
              placeholder="Loan Amount"
            />
            <input
              type="number"
              name="loan_int_rate"
              value={input.loan_int_rate}
              onChange={handleChange}
              placeholder="Interest Rate"
            />
            <input
              type="number"
              name="loan_percent_income"
              value={input.loan_percent_income}
              onChange={handleChange}
              placeholder="Loan % of Income"
            />

            <select
              name="cb_person_default_on_file"
              value={input.cb_person_default_on_file}
              onChange={handleChange}
            >
              <option value="">Default on File</option>
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>

            <input
              type="number"
              name="cb_person_cred_hist_length"
              value={input.cb_person_cred_hist_length}
              onChange={handleChange}
              placeholder="Credit History Length"
            />
            <div></div>
            <button type="submit">Predict</button>
          </form>
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          <h2>Prediction Result</h2>
          {prediction ? <p>{prediction}</p> : <p>No result yet. Submit the form to get predictions.</p>}
          <button onClick={handleAnalysis} className={styles.analyseButton}>
            Why
          </button>
          {analysis && (
            <div className={styles.analysisResult}>
              <h3>Analysis:</h3>
              <p>{analysis}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoanPrediction;
