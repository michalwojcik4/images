import { useContext } from 'react';
import { PixabayContext } from 'App';
import PropTypes from 'prop-types';

import css from './Button.module.css';

export function Button({onLoadMore}){
  const { loading } = useContext(PixabayContext);
    return (
      <button type="button" className={css.loadMoreBtn} onClick={onLoadMore} disabled={loading}>
        Load more
      </button>
    );
  }

  Button.propTypes = {
    onLoadMore: PropTypes.func
  };