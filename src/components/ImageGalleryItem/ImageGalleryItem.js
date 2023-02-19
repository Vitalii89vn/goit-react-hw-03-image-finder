import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css'
import { Modal } from "components/Modal/Modal";
import { Component } from 'react';

export class ImageGalleryItem extends Component {
    state = {
        showModal: false
    };
    static propTypes = {
        image: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        imageLarge: PropTypes.string.isRequired,
    };

    toggleModal = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal,
        }))
    };
    
    render() {
        const { image, alt, imageLarge } = this.props;
        const { showModal } = this.state;
        const { toggleModal } = this;

        return (
            <li className={css.ImageGalleryItem} >
                {!showModal ?
                <img src={image} alt={alt} onClick={toggleModal} className={ css.ImageGalleryItem_image} />
                :
                 <Modal showModal={toggleModal}> <img src={imageLarge} alt={alt} /> </Modal>}
            </li>
        );
    }
}

