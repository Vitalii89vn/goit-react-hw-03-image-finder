import { Component } from "react";
import { Button } from "./Button/Button";
import { SearchBar } from "./Searchbar/Searchbar";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";



export class App extends Component {

  render() {
    return (
      <div>
        <SearchBar />
        <ImageGalleryItem/>
        <Button />
      
        
      </div>
    )
  }
};
  
/* Hello!!
      key = '32359638-7443e20de0ded3dc69cc0faa3' */