from keras.models import Sequential
from keras.layers import Embedding, LSTM, GRU

# Create a Sequential model
model = Sequential()

# Add an Embedding layer (as discussed in the previous response)
model.add(Embedding(input_dim=vocab_size, output_dim=embedding_dim, input_length=max_sequence_length))

# Add LSTM layers
model.add(LSTM(units=64, return_sequences=True))  # Return sequences if you have multiple LSTM layers stacked
model.add(LSTM(units=64, return_sequences=True))  # Add more LSTM layers if needed

# Add GRU layers
model.add(GRU(units=32, return_sequences=True))    # Return sequences if you have multiple GRU layers stacked
model.add(GRU(units=32, return_sequences=True))    # Add more GRU layers if needed

# You can also add Dense layers or other layers after LSTM/GRU layers for further processing

# Compile the model and specify loss, optimizer, and metrics
model.compile(loss='mean_squared_error', optimizer='adam', metrics=['accuracy'])


new 
from keras.models import Sequential
from keras.layers import Embedding, LSTM, Dense

# Create a Sequential model
model = Sequential()

# Add an Embedding layer (as discussed earlier)
model.add(Embedding(input_dim=vocab_size, output_dim=embedding_dim, input_length=max_sequence_length))

# Add LSTM or GRU layers (choose one, you can also stack more if needed)
model.add(LSTM(units=64, return_sequences=True))

# Add a Dense layer for prediction with softmax activation
model.add(Dense(units=vocab_size, activation='softmax'))

# Compile the model and specify loss, optimizer, and metrics
model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
