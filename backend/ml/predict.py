import sys
import os
import pandas as pd
import joblib

ingredient_count = int(sys.argv[1])
instruction_length = int(sys.argv[2])

model_path = os.path.join(
    os.path.dirname(__file__),
    "meal_classifier.pkl"
)

model = joblib.load(model_path)

df_input = pd.DataFrame(
    [[ingredient_count, instruction_length]],
    columns=["ingredient_count", "instruction_length"]
)

prediction = model.predict(df_input)

print(prediction[0])