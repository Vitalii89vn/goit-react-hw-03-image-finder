import { Component } from "react";
import { Button } from "components/Button/Button";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import PropTypes from 'prop-types';




export class ImageGallery extends Component {

    state = {
        images: null,
        error: null,
        page: 1,
        status: 'idle'
    };

    static propTypes = {
        query: PropTypes.string.isRequired
    };

    componentDidUpdate(prevProps, _) {
        const { page } = this.state;
        const prevQuery = prevProps.query;
        const nextQuery = this.props.query;
        const API_KEY = '32359638-7443e20de0ded3dc69cc0faa3';
        const BAZE_URL = 'https://pixabay.com/api/'
     
        if (prevQuery !== nextQuery) {
            this.setState({status: 'pending'})

            fetch(`${BAZE_URL}?q=${nextQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=24`)
                .then(response => {
                    if (response.ok) {
                    return response.json()
                      } 
                    return Promise.reject(new Error('Sorry, there are no images matching your search query. Please try again.'))
                })
                .then(images => this.setState({ images, status: "resolved" }))
                .catch(error => this.setState({ error, status: "rejected" }))
               
        };
    };

    onClickLoadMore = () => {
        this.setState(prevState => ({
           page: prevState.page + 1
        }))    
    }

    render() {
        const { images, status, error, page } = this.state;
        
      
            if (status === "idle") {
                return <div></div>
        };
            if (status === "pending") {
            return <div>Loading....</div>
        };
            if (status === "resolved") {
                return (<div>
                    <ul className="gallery">
                        {images && images.hits.map(({ id, webformatURL, tags }) => (
                            <ImageGalleryItem key={id} image={webformatURL} alt={tags} />
                        ))}
                    </ul>
                    {images.totalHits !== 0 && (images.totalHits / page / 12 >= 1) && <Button />}
                </div>
                )
        };
        if (status === "rejected") {
                return <h2>{error.message}</h2>;
        };       
    }
};
