import { Component } from "react";
import { SearchBar } from "./Searchbar/Searchbar";
import { ImageGallery} from "components/ImageGallery/ImageGallery";



export class App extends Component {
  state = {
    searchQuery: ''
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery })
  };

  render() {
    const { searchQuery } = this.state;
    const { handleFormSubmit } = this;
    return (
      <div>
        <SearchBar onSubmit={handleFormSubmit} />
        <ImageGallery query={searchQuery} />
        
      
        
      </div>
    )
  }
};
  