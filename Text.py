# src/train.py
import pandas as pd
import torch
from transformers import BertTokenizer, BertForSequenceClassification
from torch.utils.data import DataLoader, TensorDataset
import torch.optim as optim
import torch.nn as nn

# Load and preprocess data
data = pd.read_excel('data/ticket_data.xlsx')
# Data preprocessing steps go here, including text cleaning, tokenization, etc.

# Split data into train and test sets
train_data, test_data = train_test_split(data, test_size=0.2, random_state=42)

# Tokenize input and output text
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
train_input = tokenizer(train_data['problem_description'].tolist(), padding=True, truncation=True, return_tensors="pt", max_length=128)
train_output = tokenizer(train_data['resolution_steps'].tolist(), padding=True, truncation=True, return_tensors="pt", max_length=128)

# Create DataLoader for training
train_dataset = TensorDataset(train_input['input_ids'], train_input['attention_mask'], train_output['input_ids'], train_output['attention_mask'])
train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)

# Define the model architecture
model = BertForSequenceClassification.from_pretrained("bert-base-uncased")
# Modify the model head for sequence-to-sequence tasks
model.classifier = nn.Linear(model.config.hidden_size, tokenizer.vocab_size)

# Define loss function and optimizer
criterion = nn.CrossEntropyLoss()
optimizer = optim.AdamW(model.parameters(), lr=1e-5)

# Training loop
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
model.train()

for epoch in range(epochs):
    total_loss = 0
    for batch in train_loader:
        input_ids, attention_mask, output_ids, output_mask = batch
        input_ids, attention_mask, output_ids, output_mask = input_ids.to(device), attention_mask.to(device), output_ids.to(device), output_mask.to(device)
        
        # Forward pass
        outputs = model(input_ids=input_ids, attention_mask=attention_mask, labels=output_ids)
        loss = outputs.loss
        
        # Backpropagation and optimization
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        
        total_loss += loss.item()

    # Print the average loss for this epoch
    print(f"Epoch [{epoch + 1}/{epochs}] - Loss: {total_loss / len(train_loader)}")

# Save the trained model
model.save_pretrained('models/')






new




import pandas as pd
import numpy as np
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.models import Sequential
from keras.layers import Embedding, LSTM, Dense

# Load your data from the Excel file
data = pd.read_excel("your_data.xlsx")

# Assuming your Excel file has columns "short problem description" and "resolution steps"
problem_descriptions = data["short problem description"]
resolution_steps = data["resolution steps"]

# Tokenize the text data
tokenizer = Tokenizer()
tokenizer.fit_on_texts(problem_descriptions)
sequences = tokenizer.texts_to_sequences(problem_descriptions)

# Padding/Truncating sequences
max_sequence_length = 100  # Adjust this based on your data
X = pad_sequences(sequences, maxlen=max_sequence_length, padding='post', truncating='post')

# Tokenize the target (resolution steps)
target_tokenizer = Tokenizer()
target_tokenizer.fit_on_texts(resolution_steps)
target_sequences = target_tokenizer.texts_to_sequences(resolution_steps)

# Padding/Truncating target sequences
Y = pad_sequences(target_sequences, maxlen=max_sequence_length, padding='post', truncating='post')

# Define vocabulary sizes and embedding dimensions
vocab_size_problem = len(tokenizer.word_index) + 1
vocab_size_resolution = len(target_tokenizer.word_index) + 1
embedding_dim = 100  # Adjust based on your data

# Create a Sequential model
model = Sequential()

# Add an Embedding layer
model.add(Embedding(input_dim=vocab_size_problem, output_dim=embedding_dim, input_length=max_sequence_length))

# Add LSTM layers
model.add(LSTM(units=64, return_sequences=True))

# Add a Dense layer for prediction with softmax activation
model.add(Dense(units=vocab_size_resolution, activation='softmax'))

# Compile the model
model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

# Train the model
batch_size = 32  # Adjust batch size based on your data and resources
num_epochs = 10  # Adjust the number of epochs based on your needs

# Assuming you have prepared your input data and target data as numpy arrays
# X is your input data (problem descriptions), and Y is your target data (resolution steps)
# You may need to one-hot encode your target data or use appropriate loss functions depending on your specific problem

model.fit(X, Y, batch_size=batch_size, epochs=num_epochs)





new




import spacy
import random
import pandas as pd

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Load your Excel data into a DataFrame
df = pd.read_excel("your_excel_file.xlsx")

# Define training data in the format (description, closing steps)
training_data = [(row["Description"], row["Closing steps"]) for index, row in df.iterrows()]

# Shuffle the training data
random.shuffle(training_data)

# Split the data into training and testing sets (adjust the split ratio as needed)
split_ratio = 0.8
split_index = int(len(training_data) * split_ratio)
train_data = training_data[:split_index]
test_data = training_data[split_index:]

# Initialize a text classification pipeline
text_classifier = spacy.blank("en")
text_cat = text_classifier.add_pipe("textcat")

# Add labels (categories) to the text classification component
text_cat.add_label("closing_steps")

# Training the model
nlp.begin_training()
for epoch in range(10):  # You can adjust the number of epochs
    random.shuffle(train_data)
    losses = {}
    for text, annotations in train_data:
        nlp.update([text], [{"cats": {"closing_steps": 1 if annotations else 0}}], losses=losses)

# Save the trained model
text_classifier.to_disk("trained_text_classifier")

# Test the model
correct = 0
total = len(test_data)
for text, annotation in test_data:
    doc = nlp(text)
    predicted_closing_steps = doc.cats.get("closing_steps", 0)
    if predicted_closing_steps == (1 if annotation else 0):
        correct += 1

accuracy = correct / total
print(f"Test Accuracy: {accuracy}")
