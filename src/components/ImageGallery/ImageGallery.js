import { Component } from "react";

import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";


const API_KEY = '32359638-7443e20de0ded3dc69cc0faa3';

export class ImageGallery extends Component {

    

    componentDidUpdate(prevProps, prevState) {
        const prevQuery = prevProps.query;
        const nextQuery = this.props.query;

        console.log(prevQuery);
        console.log(nextQuery);
        if (prevQuery !== nextQuery) {
            fetch(`https://pixabay.com/api/?q=${nextQuery}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
                .then(r => r.json())
                .then(console.log)
        };
}

    render() {
        return (
            <ul className="gallery">
                {/* images.map(image => ) */}
                <ImageGalleryItem />
            </ul>)
    }
};