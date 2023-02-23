import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';


export const ImageGallery = (({card}) => {
    return (
           
        <ul className={css.ImageGallery}>
            {card.map(({ id, webformatURL, tags, largeImageURL }) => (
                <ImageGalleryItem
                    key={id}
                    image={webformatURL}
                    alt={tags}
                    imageLarge={largeImageURL}
                />
            ))}
        </ul>
    );
})
    
ImageGallery.propTypes = {
card: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
})).isRequired
};
