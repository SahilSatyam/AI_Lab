import pandas as pd
from sklearn.model_selection import train_test_split
from transformers import BertTokenizer, BertForQuestionAnswering, TrainingArguments, Trainer
import torch

# Step 1: Data Preparation

# Load your Excel data into a pandas DataFrame
df = pd.read_excel("your_data.xlsx")

# Preprocess the data (you may need to clean and preprocess text)
# In this example, we assume you have a 'Description' column and a 'Closing steps' column
# Concatenate them into a 'context' column for QA
df['context'] = df['Description'] + " " + df['Closing steps']

# Split the data into a training set and a testing set
train_df, test_df = train_test_split(df, test_size=0.2, random_state=42)

# Step 2: Model Training

# Load BERT-Medium model and tokenizer
model_name = "bert-medium-cased"
tokenizer = BertTokenizer.from_pretrained(model_name)
model = BertForQuestionAnswering.from_pretrained(model_name)

# Define a function to prepare your data for training
def prepare_qa_data(examples):
    inputs = tokenizer(examples['question'], examples['context'], truncation=True, padding='max_length', max_length=512)
    targets = {}
    targets["start_positions"] = examples['start_positions']
    targets["end_positions"] = examples['end_positions']
    return inputs, targets

# Format your training and testing data
train_data = train_df.apply(prepare_qa_data, axis=1)
test_data = test_df.apply(prepare_qa_data, axis=1)

# Define your training arguments
training_args = TrainingArguments(
    output_dir="./qa_model",
    per_device_train_batch_size=8,
    num_train_epochs=3,
    evaluation_strategy="epoch",
    save_total_limit=2,
    load_best_model_at_end=True,
)

# Create a Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_data.tolist(),
    eval_dataset=test_data.tolist(),
)

# Train the model
trainer.train()

# Save the trained model
trainer.save_model()

# Step 3: Question-Answering Interface

# Load the fine-tuned model
qa_model = BertForQuestionAnswering.from_pretrained("./qa_model")

# Create a function to perform question-answering
def ask_question(query, context):
    inputs = tokenizer.encode_plus(query, context, add_special_tokens=True, return_tensors="pt")
    start_positions, end_positions = qa_model(**inputs)
    answer_start = torch.argmax(start_positions)
    answer_end = torch.argmax(end_positions) + 1
    answer = tokenizer.convert_tokens_to_string(tokenizer.convert_ids_to_tokens(inputs["input_ids"][0][answer_start:answer_end]))
    return answer

# Example usage:
query = "What should I do when I encounter this issue?"
context = "Description of the issue goes here... Closing steps go here..."
closing_steps = ask_question(query, context)
print("Closing Steps:", closing_steps)
