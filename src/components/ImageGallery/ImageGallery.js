import { Component } from "react";
import { Button } from "components/Button/Button";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Loader } from "components/Loader/Loader";

import PropTypes from 'prop-types';





export class ImageGallery extends Component {

    state = {
        images: null,
        error: null,
        // page: 1,
        status: 'idle',
        card: [],
          showModal: false,
    };

    static propTypes = {
        query: PropTypes.string.isRequired,
        page: PropTypes.number.isRequired,
    };

    componentDidUpdate(prevProps, prevState) {
   
        const prevQuery = prevProps.query;
        const nextQuery = this.props.query;
        const prevpage = prevProps.page;
        const nextpage = this.props.page;
         
        const API_KEY = '32359638-7443e20de0ded3dc69cc0faa3';
        const BAZE_URL = 'https://pixabay.com/api/'
     
        if (prevQuery !== nextQuery || prevpage !== nextpage ) {
            this.setState({status: 'pending'})

            setTimeout(() => {
                fetch(`${BAZE_URL}?q=${nextQuery}&page=${nextpage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=3`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    return Promise.reject(new Error('Sorry, there are no images matching your search query. Please try again.'))
                })
                .then(images => (this.setState(prevState =>({ images, status: "resolved", card: [...prevState.card, ...images.hits ] }) )))
                .catch(error => this.setState({ error, status: "rejected" }))
            }, 1000);
        };
    };

      toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));};
 
    render() {
        const {  status, error, images, card } = this.state;
        const { page } = this.props;

        if (status === "idle") {
                return <div></div>
        };
            if (status === "pending") {
                return <Loader />
        };
        if (status === "resolved") {
            return (
                <div>
                    <ul className="gallery">
                        {images && card.map(({ id, webformatURL, tags, largeImageURL }) => (
                            <ImageGalleryItem key={id} image={webformatURL} alt={tags} imageLarge={largeImageURL} isOpenModal={() => this.toggleModal()} showModal={ this.state.showModal} />
                        ))}
                    </ul>
                    {images.totalHits !== 0 && (images.totalHits / page / 12 >= 1) && <Button onClick={this.props.onClick} />}
                  
                </div>
                
            );
        };
        if (status === "rejected") {
                return <h2>{error.message}</h2>;
        };    
        
    }
};
