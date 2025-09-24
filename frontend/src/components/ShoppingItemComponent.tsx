import React, { useState } from 'react';
import { ShoppingItem } from '../types';

interface ShoppingItemProps {
  item: ShoppingItem;
  onUpdate: (id: string, updates: Partial<ShoppingItem>) => void;
  onDelete: (id: string) => void;
}

const categories = ['Groceries', 'Electronics', 'Clothing', 'Health', 'Home', 'Other'];

const ShoppingItemComponent: React.FC<ShoppingItemProps> = ({ item, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: item.name,
    category: item.category,
    quantity: item.quantity
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(item.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: item.name,
      category: item.category,
      quantity: item.quantity
    });
    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    onUpdate(item.id, { completed: !item.completed });
  };

  if (isEditing) {
    return (
      <div className="shopping-item editing">
        <input
          type="text"
          value={editData.name}
          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          className="edit-input"
        />
        <select
          value={editData.category}
          onChange={(e) => setEditData({ ...editData, category: e.target.value })}
          className="edit-select"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="number"
          min="1"
          value={editData.quantity}
          onChange={(e) => setEditData({ ...editData, quantity: parseInt(e.target.value) })}
          className="edit-quantity"
        />
        <div className="item-actions">
          <button onClick={handleSave} className="save-btn">Save</button>
          <button onClick={handleCancel} className="cancel-btn">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`shopping-item ${item.completed ? 'completed' : ''}`}>
      <div className="item-info">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={handleToggleComplete}
          className="item-checkbox"
        />
        <div className="item-details">
          <span className="item-name">{item.name}</span>
          <div className="item-meta">
            <span className="item-category">{item.category}</span>
            <span className="item-quantity">Qty: {item.quantity}</span>
          </div>
        </div>
      </div>
      <div className="item-actions">
        <button onClick={handleEdit} className="edit-btn">Edit</button>
        <button onClick={() => onDelete(item.id)} className="delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default ShoppingItemComponent;