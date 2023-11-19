import torch
import numpy as np

# Semantic model
from transformers import AutoTokenizer, AutoModelForSequenceClassification

tokenizer = AutoTokenizer.from_pretrained("ProsusAI/finbert")
model = AutoModelForSequenceClassification.from_pretrained("ProsusAI/finbert")

def semantic_analyzer(strings):
  ''' Strings: List of articles as strings'''

  def model_predict(input_text):
    inputs = tokenizer(input_text, return_tensors="pt", truncation=True)
    # Forward pass through the model
    outputs = model(**inputs)
    # Get predicted class probabilities
    probabilities = outputs.logits.softmax(dim=1)
    # Get predicted class label
    predicted_class = torch.argmax(probabilities, dim=1).item()

    return probabilities.detach().flatten().numpy(), predicted_class

  pos_total, neg_total, neut_total = 0, 0, 0
  positives = np.zeros(len(strings))
  avg_vector = np.zeros(3)
  for i, string in enumerate(strings):
    probabilities, predicted_class = model_predict(string)

    if predicted_class == 0:
      pos_total += 1
    elif predicted_class == 1:
      neg_total += 1
    else: 
      neut_total += 1
    
    positives[i] = probabilities[0]

    avg_vector += probabilities

  avg_vector = (avg_vector / len(strings))
  std_deviation = np.std(positives)
  avg_vector = avg_vector.tolist()
  overall_prediction = max([[x, i] for i, x in enumerate(avg_vector)])[1]

  return {'overall_pred': overall_prediction, 'std': std_deviation, 'avg_vector': avg_vector, 'num_pos': pos_total, 'num_neg': neg_total, 'num_neut': neut_total}