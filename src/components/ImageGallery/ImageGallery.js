import { Component } from "react";
import { Button } from "components/Button/Button";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Loader } from "components/Loader/Loader";
import css from './ImageGallery.module.css'
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import {FetchPixabay}  from "utils/FetchPixabay";

export class ImageGallery extends Component {

    state = {
        images: null,
        error: null,
        status: 'idle',
        card: null,
        page: 1,
      };

    static propTypes = {
        query: PropTypes.string.isRequired,
   
    };

    componentDidUpdate(prevProps, prevState) {
   
        const prevQuery = prevProps.query;
        const nextQuery = this.props.query;
        const prevpage = prevState.page;
        const nextpage = this.state.page;
       
        if (prevQuery !== nextQuery) {this.setState({ page: 1, card: [] }) };
        
        if (prevQuery !== nextQuery || prevpage !== nextpage) {
            console.log(prevQuery !== nextQuery)
                    FetchPixabay(nextQuery, nextpage)
                        .then(images => {
                            if (images.total !== 0) {
                                this.setState(prevState => ({
                                    card: [...prevState.card, ...images.hits],
                                    images,
                                    status: "resolved",
                                }));
                                console.log([...prevState.card]);
                                console.log([...images.hits])
                            }
                        else {
                            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                            this.setState({ status: "rejected" })
                            };
                    })
                        .catch(error => this.setState({ error, status: "rejected" }))
        }
         
    };

    onClickLoadMore = () => {
        this.setState(prevState => ({
            page: prevState.page + 1
        }))
    };
  
    render() {
        const { status, error, images, card, page } = this.state;
        const {onClickLoadMore} = this
    
        if (status === "idle") {
                return <div></div>
        };
            if (status === "pending") {
                return <Loader />

        };
    
        if (status === "rejected") {
            return <h2>{error}</h2>;}
        return (
                <div>
                    <ul className={css.ImageGallery}>
                        {   images.total !== 0 &&
                            card.map(({ id, webformatURL, tags, largeImageURL }) => (
                            <ImageGalleryItem
                                key={id}
                                image={webformatURL}
                                alt={tags}
                                imageLarge={largeImageURL}
                            />
                        ))}
                    </ul>
                    {images.total !== 0 && (images.total / page / 12 >= 1) && <Button onClick={() => onClickLoadMore()} />}
                </div>  
            );   
        }; 
    
};
