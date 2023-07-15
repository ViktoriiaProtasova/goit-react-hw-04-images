import { useState } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';
import css from './ImageGallery.module.css';

const ImageGallery = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleModal = image => {
    setShowModal(!showModal);
    setSelectedImage(image);
  };

  return (
    <>
      {showModal && (
        <Modal onClick={toggleModal}>
          {selectedImage && (
            <img src={selectedImage.largeImageURL} alt={selectedImage.tags} />
          )}
        </Modal>
      )}
      <ul className={css.ImageGallery}>
        {data.map(image => (
          <ImageGalleryItem
            onClick={toggleModal}
            key={image.id}
            image={image}
          />
        ))}
      </ul>
    </>
  );
};

ImageGallery.propTypes = { data: PropTypes.array.isRequired };

export default ImageGallery;
