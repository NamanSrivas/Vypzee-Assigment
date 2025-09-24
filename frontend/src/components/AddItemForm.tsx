import React, { useState } from 'react';
import { NewItemForm } from '../types';

interface AddItemFormProps {
  onAddItem: (item: NewItemForm) => void;
}

const categories = ['Groceries', 'Electronics', 'Clothing', 'Health', 'Home', 'Other'];

const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem }) => {
  const [formData, setFormData] = useState<NewItemForm>({
    name: '',
    category: 'Groceries',
    quantity: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onAddItem(formData);
      setFormData({ name: '', category: 'Groceries', quantity: 1 });
    }
  };

  return (
    <form className="add-item-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Item name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="item-input"
        />
      </div>
      
      <div className="form-row">
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="category-select"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        
        <input
          type="number"
          min="1"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
          className="quantity-input"
        />
        
        <button type="submit" className="add-btn">
          Add Item
        </button>
      </div>
    </form>
  );
};

export default AddItemForm;