import { Component } from "react";
import { Button } from "components/Button/Button";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import PropTypes from 'prop-types';
import { RotatingLines } from  'react-loader-spinner'





export class ImageGallery extends Component {

    state = {
        images: null,
        error: null,
        // page: 1,
        status: 'idle',
        card: []
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
     
        if (prevQuery !== nextQuery || prevpage !== nextpage) {
            this.setState({status: 'pending'})

            setTimeout(() => {
                fetch(`${BAZE_URL}?q=${nextQuery}&page=${nextpage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=4`)
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

    render() {
        const {  status, error, images, card } = this.state;
        const { page } = this.props;
        
      
            if (status === "idle") {
                return <div></div>
        };
            if (status === "pending") {
                return <div><h2>Loading images....</h2>
                    <RotatingLines
                        strokeColor="red"
                        strokeWidth="5"
                        animationDuration="1"
                        width="96"
                        visible={true}
                        /></div>
        };
        if (status === "resolved") {
            return (
                <div>
                    <ul className="gallery">
                        {images && card.map(({ id, webformatURL, tags }) => (
                            <ImageGalleryItem key={id} image={webformatURL} alt={tags} />
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
