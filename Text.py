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
