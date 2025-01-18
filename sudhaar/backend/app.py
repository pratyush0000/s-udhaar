from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

# Load the trained model
model = joblib.load('loan_prediction_model_final.pkl')

# Define expected categorical values from training
CATEGORICAL_FEATURES = {
    'person_home_ownership': ['RENT', 'OWN', 'MORTGAGE', 'OTHER'],
    'loan_intent': ['EDUCATION', 'MEDICAL', 'PERSONAL', 'VENTURE', 'DEBTCONSOLIDATION', 'HOMEIMPROVEMENT'],
    'loan_grade': ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    'cb_person_default_on_file': ['N', 'Y']
}

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

def preprocess_input(data):
    """Convert input data to match trained model features."""
    categorical_df = pd.DataFrame([data])
    categorical_df = pd.get_dummies(categorical_df, columns=CATEGORICAL_FEATURES.keys())

    expected_categorical_cols = [
        f"{col}_{val}" for col, values in CATEGORICAL_FEATURES.items() for val in values
    ]

    for col in expected_categorical_cols:
        if col not in categorical_df:
            categorical_df[col] = 0

    categorical_df = categorical_df[expected_categorical_cols]

    numeric_features = [
        'person_age', 'person_income', 'person_emp_length', 'loan_amnt',
        'loan_int_rate', 'loan_percent_income', 'cb_person_cred_hist_length'
    ]

    numeric_data = {feature: float(data[feature]) for feature in numeric_features}
    processed_data = pd.concat([pd.DataFrame([numeric_data]), categorical_df], axis=1)

    return processed_data.values[0].tolist()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        processed_features = preprocess_input(data)

        if len(processed_features) != model.n_features_in_:
            return jsonify({'error': f'Expected {model.n_features_in_} features, but got {len(processed_features)}'}), 400

        prediction = model.predict([processed_features])
        return jsonify({'prediction': int(prediction[0])})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
