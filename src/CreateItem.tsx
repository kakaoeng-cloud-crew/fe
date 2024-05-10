import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateItem() {
  const [itemName, setItemName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Add your API call logic here to create an item
    console.log('Item created:', itemName);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="itemName">Item Name:</label>
      <input
        id="itemName"
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <button type="submit">Create Item</button>
    </form>
  );
}

export default CreateItem;
