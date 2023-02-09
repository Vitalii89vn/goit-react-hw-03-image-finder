import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css'

export const ImageGalleryItem = ({image, alt}) => {
    return (
    <li className={css.galleryItem}>
            <img src={image} alt={alt} width='100' height='100' loading="lazy"/>
        </li>
    )
};
ImageGalleryItem.propTypes = {
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
}