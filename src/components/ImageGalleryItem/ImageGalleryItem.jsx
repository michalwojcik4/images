import PropTypes from 'prop-types';

import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem({ image, onImageClick }) {
  return (
    <li className={css.gallery__item}>
      <img
        className={css.gallery__img}
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => onImageClick(image.largeImageURL)}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string,
    tags: PropTypes.string,
    largeImageURL: PropTypes.string,
  }),
  onImageClick: PropTypes.func,
};
