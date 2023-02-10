import { Component } from "react";
import { SearchBar } from "./Searchbar/Searchbar";
import { ImageGallery} from "components/ImageGallery/ImageGallery";



export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page : 1 })
  };
 onClickLoadMore = () => {
        this.setState(prevState => ({
           page: prevState.page + 1
        }))    
    }
  render() {
    const { searchQuery, page } = this.state;
    const { handleFormSubmit } = this;
    return (
      <div>
        <SearchBar onSubmit={handleFormSubmit} page={page}/>
        <ImageGallery query={searchQuery} page={page} onClick={()=> this.onClickLoadMore() } />
        
      
        
      </div>
    )
  }
};
  