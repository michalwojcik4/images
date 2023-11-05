import { useContext } from 'react';
import { PixabayContext } from 'App';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import css from './ImageGallery.module.css';

export function ImageGallery({ onImageClick }) {
  const { images } = useContext(PixabayContext);

  return (
    <ul className={css.gallery}>
      {images.map((image, index) => (
        <ImageGalleryItem
          key={index}
          image={image}
          onImageClick={onImageClick}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  onImageClick: PropTypes.func
}