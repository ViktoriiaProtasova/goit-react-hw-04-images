import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = ({ children, onClick }) => {
  useEffect(() => {
    const handleEsc = ({ code }) => {
      if (code === 'Escape') {
        onClick();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClick]);

  return (
    <div onClick={onClick} className={css.Overlay}>
      <div className={css.Modal}>{children}</div>
    </div>
  );
};

Modal.propTypes = { onClick: PropTypes.func.isRequired };

export default Modal;
