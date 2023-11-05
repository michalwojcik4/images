import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';

import css from 'App.module.css';

export const PixabayContext = React.createContext();

export function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const handleSearch = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    fetchImages();
  }, [query, page]);

  const fetchImages = () => {
    const API_KEY = '39269342-bb9295fafabc2f42da640db69';

    axios
      .get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response => {
        setImages(prevImages => [...prevImages, ...response.data.hits]);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleImageClick = largeImageURL => {
return largeImageURL
  };

  return (
    <PixabayContext.Provider value={{ images }}>
      <Searchbar onSubmit={handleSearch} />
      <div className={css.container}>
        <ImageGallery onImageClick={handleImageClick}/>
      </div>
    </PixabayContext.Provider>
  );
}
