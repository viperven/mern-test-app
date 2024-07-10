import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/items')
            .then(response => setItems(response.data))
            .catch(error => console.error(error));
    }, []);

    const addItem = () => {
        axios.post('http://localhost:5000/items', { name: newItem })
            .then(response => setItems([...items, response.data]))
            .catch(error => console.error(error));
        setNewItem('');
    };

    return (
        <div>
            <h1>Items List</h1>
            <ul>
                {items.map(item => (
                    <li key={item._id}>{item.name}</li>
                ))}
            </ul>
            <input
                type="text"
                value={newItem}
                onChange={e => setNewItem(e.target.value)}
                placeholder="Add new item"
            />
            <button onClick={addItem}>Add Item</button>
        </div>
    );
};

export default App;
