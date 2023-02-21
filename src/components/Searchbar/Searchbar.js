import { Component } from 'react';
import { GoSearch } from 'react-icons/go';
import css from './Searchbar.module.css'
import PropTypes from 'prop-types';

export class SearchBar extends Component {

    state = {
        searchQuery: '',
         };

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
      };

    handleSearch = e => {
        this.setState({ searchQuery: e.currentTarget.value.toLowerCase() })
    };

    handleSubmit = e => {
        const { searchQuery } = this.state;
    
        e.preventDefault();
        if (searchQuery.trim() === '') {
            return;
        };
        this.props.onSubmit(searchQuery);
        this.setState({ searchQuery: ''})
    };

    render() {
        const { handleSearch, handleSubmit } = this;
        const { searchQuery } = this.state;
        
        return (
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={handleSubmit}>
                    <button type="submit" className={css.SearchForm_button} aria-label='search-button'>
                        <GoSearch width='28' height='28' fill='#1a1212' />
                    </button>
                
                    <input
                        className={css.SearchForm_input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        value={searchQuery}
                        placeholder="Search images and photos"
                        onChange={handleSearch}
                    />
                </form>
            </header>
        )
    }
};