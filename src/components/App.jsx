import { Component } from "react";
import { SearchBar } from "./Searchbar/Searchbar";
import { ImageGallery} from "components/ImageGallery/ImageGallery";
import Notiflix from 'notiflix';
import { FetchPixabay } from "utils/FetchPixabay";
import { Loader } from "components/Loader/Loader";
import { Button } from "components/Button/Button";

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: {},
    error: null,
    card: [],
    loading: false,
  };

  componentDidUpdate(_, prevState) {
   
        const prevQuery = prevState.searchQuery;
        const nextQuery = this.state.searchQuery;
        const prevpage = prevState.page;
        const nextpage = this.state.page;
       
    if (prevQuery !== nextQuery) { this.setState({ card: [], images: {} }) };
        
        if (prevQuery !== nextQuery || prevpage !== nextpage) {
          this.setState({loading: true })
  
           FetchPixabay(nextQuery, nextpage)
            .then(images => {
              if (images.total !== 0) {
                this.setState(prevState => ({
                  card: [...prevState.card, ...images.hits],
                  images,
                }));
              }
              else {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
              };
            })
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ loading: false }))       
          }
  };
  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1 })
  };
  onClickLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }))
  };
  render() {
    const { page, images, card, loading, error} = this.state;
    const { handleFormSubmit, onClickLoadMore} = this;
    return (
      <div>
        <SearchBar onSubmit={handleFormSubmit} />
        { images.total !== 0 && <ImageGallery card={card} /> }
        { loading && <Loader /> }
        { !loading && images.total !== 0 && (images.total / page / 12 >= 1) && <Button onClick={() => onClickLoadMore()} /> }
        { images.total === 0 && error.message }
      </div>
    )
  }
}
  