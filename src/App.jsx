import React, { useState } from 'react';

import { Searchbar } from './components/Searchbar/Searchbar';

export const PixabayContext = React.createContext();

export function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');

  const handleSearch = newQuery => {
    setQuery(newQuery);
    setImages([]);
  };

  return (
    <PixabayContext.Provider value={{ images }}>
      <Searchbar onSubmit={handleSearch} />
    </PixabayContext.Provider>
  );
}
