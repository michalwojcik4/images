import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Button } from './components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

import css from 'App.module.css';

export const PixabayContext = React.createContext();

export function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const removeDuplicatesById = (data, key) => {
    return [...new Map(data.map(x => [key(x), x])).values()];
  };

  const fetchImages = useCallback(async () => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    setLoading(true);

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );

      const newImages = response.data.hits;
      setImages(prevImages =>
        removeDuplicatesById([...prevImages, ...newImages], item => item.id)
      );
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleImageClick = largeImageURL => {
    setShowModal(true);
    setModalImage(largeImageURL);
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage('');
    document.body.classList.remove('modal-open');
  };

  return (
    <PixabayContext.Provider value={{ images, loading }}>
      <Searchbar onSubmit={handleSearch} />
      {loading && <Loader />}
      <div className={css.container}>
        <ImageGallery onImageClick={handleImageClick} />
        {images.length >= 12 && !loading && (
          <Button onLoadMore={handleLoadMore} />
        )}
      </div>
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={modalImage} alt="Large" />
        </Modal>
      )}
    </PixabayContext.Provider>
  );
}
