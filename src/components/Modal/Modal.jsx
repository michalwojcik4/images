import PropTypes from 'prop-types';

import css from './Modal.module.css';

export function Modal({ onClose, children }) {
  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal}>{children}</div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.element,
};
