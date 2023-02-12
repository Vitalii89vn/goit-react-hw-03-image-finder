import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css'
import { Modal } from "components/Modal/Modal";

export const ImageGalleryItem = ({ image, alt, imageLarge, showModal, isOpenModal }) => {
    <img src={imageLarge} alt={alt} onClick={isOpenModal} width="500" height="500"/>
    return (
        <li className={css.galleryItem} >
            
            {showModal && <Modal></Modal>}
                {/* <img src={image} alt={alt} width='100' height='100' loading="lazy" onClick={isOpenModal} />} */}
         
        </li> 
    )
};
ImageGalleryItem.propTypes = {
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
}
