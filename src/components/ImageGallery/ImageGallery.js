import { Component } from "react";
import { Button } from "components/Button/Button";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Loader } from "components/Loader/Loader";
import css from './ImageGallery.module.css'
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';

export class ImageGallery extends Component {

    state = {
        images: null,
        error: null,
        status: 'idle',
        card: [],
      };

    static propTypes = {
        query: PropTypes.string.isRequired,
        page: PropTypes.number.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    componentDidUpdate(prevProps, _) {
   
        const prevQuery = prevProps.query;
        const nextQuery = this.props.query;
        const prevpage = prevProps.page;
        const nextpage = this.props.page;
         
        const API_KEY = '32359638-7443e20de0ded3dc69cc0faa3';
        const BAZE_URL = 'https://pixabay.com/api/';
       
        if (prevQuery !== nextQuery) (this.setState({ card: [] }))

        if (prevQuery !== nextQuery || prevpage !== nextpage ) {
            this.setState({status: 'pending'})

                fetch(`${BAZE_URL}?q=${nextQuery}&page=${nextpage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
                    .then(response => {
                        if (response.ok) {
                            return response.json()
                        }
                        return Promise.reject(new Error('Sorry, there are no images matching your search query. Please try again.'))
                    })
                    .then(images => {
                        if (images.totalHits !== 0) { this.setState(prevState => ({ images, status: "resolved", card: [...prevState.card, ...images.hits] })) }
                        else {
                            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                            this.setState({ status: "rejected" })
                        }
                    })
                    
                    .catch(error => this.setState({ error, status: "rejected" }))
        };
    };
  
    render() {
        const { status, error, images, card } = this.state;
        const { page, onClick } = this.props;

        if (status === "idle") {
                return <div></div>
        };
            if (status === "pending") {
                return <Loader />
        };
        if (status === "resolved") {
            return (
                <div>
                    <ul className={css.ImageGallery}>
                        {images && card.map(({ id, webformatURL, tags, largeImageURL }) => (
                            <ImageGalleryItem
                                key={id}
                                image={webformatURL}
                                alt={tags}
                                imageLarge={largeImageURL}
                            />
                        ))}
                    </ul>
                    {images.totalHits !== 0 && (images.totalHits / page / 12 >= 1) && <Button onClick={onClick} />}
                </div>  
            );
        };
        if (status === "rejected") {
            return <h2>{error}</h2>;
        };    
        
    }
};
