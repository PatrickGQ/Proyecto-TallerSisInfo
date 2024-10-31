import React, { useState } from 'react';

const SearchBarInventory = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleInputChange}
      placeholder="Buscar inventario (fecha, empleado)..."
      className="border p-2 rounded-md w-full mb-4"
    />
  );
};

export default SearchBarInventory;