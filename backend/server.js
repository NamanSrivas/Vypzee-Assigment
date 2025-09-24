const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let shoppingItems = [];

app.get('/api/items', (req, res) => {
  res.json(shoppingItems);
});

app.post('/api/items', (req, res) => {
  const { name, category, quantity } = req.body;
  
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Item name is required' });
  }

  const newItem = {
    id: uuidv4(),
    name: name.trim(),
    category: category || 'Other',
    quantity: quantity || 1,
    completed: false,
    createdAt: new Date().toISOString()
  };

  shoppingItems.push(newItem);
  res.status(201).json(newItem);
});

app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, category, quantity, completed } = req.body;

  const itemIndex = shoppingItems.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  if (name !== undefined) shoppingItems[itemIndex].name = name.trim();
  if (category !== undefined) shoppingItems[itemIndex].category = category;
  if (quantity !== undefined) shoppingItems[itemIndex].quantity = quantity;
  if (completed !== undefined) shoppingItems[itemIndex].completed = completed;

  res.json(shoppingItems[itemIndex]);
});

app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const itemIndex = shoppingItems.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  shoppingItems.splice(itemIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});