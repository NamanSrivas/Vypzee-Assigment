import React, { useState, useEffect } from 'react';
import './App.css';
import { ShoppingItem, NewItemForm } from './types';
import { shoppingListAPI } from './api';
import AddItemForm from './components/AddItemForm';
import ShoppingItemComponent from './components/ShoppingItemComponent';

function App() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await shoppingListAPI.getItems();
      setItems(data);
    } catch (err) {
      setError('Failed to load items. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (newItem: NewItemForm) => {
    try {
      const createdItem = await shoppingListAPI.createItem(newItem);
      setItems(prev => [...prev, createdItem]);
    } catch (err) {
      setError('Failed to add item');
    }
  };

  const handleUpdateItem = async (id: string, updates: Partial<ShoppingItem>) => {
    try {
      const updatedItem = await shoppingListAPI.updateItem(id, updates);
      setItems(prev => prev.map(item => item.id === id ? updatedItem : item));
    } catch (err) {
      setError('Failed to update item');
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await shoppingListAPI.deleteItem(id);
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  const filteredItems = items.filter(item => {
    if (filter === 'pending') return !item.completed;
    if (filter === 'completed') return item.completed;
    return true;
  });

  const stats = {
    total: items.length,
    completed: items.filter(item => item.completed).length,
    pending: items.filter(item => !item.completed).length
  };

  if (loading) {
    return <div className="App loading">Loading...</div>;
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>Shopping List</h1>
        <div className="stats">
          <span className="stat">Total: {stats.total}</span>
          <span className="stat">Pending: {stats.pending}</span>
          <span className="stat">Completed: {stats.completed}</span>
        </div>
      </header>

      <main className="app-main">
        <AddItemForm onAddItem={handleAddItem} />
        
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)} className="dismiss-btn">×</button>
          </div>
        )}

        <div className="filter-controls">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All Items
          </button>
          <button 
            className={filter === 'pending' ? 'active' : ''}
            onClick={() => setFilter('pending')}
          >
            Pending ({stats.pending})
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed ({stats.completed})
          </button>
        </div>

        <div className="shopping-list">
          {filteredItems.length === 0 ? (
            <div className="empty-state">
              {filter === 'all' ? 'No items yet. Add your first item!' : 
               filter === 'pending' ? 'No pending items.' : 'No completed items.'}
            </div>
          ) : (
            filteredItems.map(item => (
              <ShoppingItemComponent
                key={item.id}
                item={item}
                onUpdate={handleUpdateItem}
                onDelete={handleDeleteItem}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
