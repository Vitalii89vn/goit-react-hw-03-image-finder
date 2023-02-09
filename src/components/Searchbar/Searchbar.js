import { Component } from 'react';
import { GoSearch } from 'react-icons/go'

 
export class SearchBar extends Component {

    state = {
        searchQuery: ''
    }

    handleSearch = e => {
        this.setState({ searchQuery: e.currentTarget.value.toLowerCase() })
    };

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.searchQuery.trim() === ''){
            return;
        };
        this.props.onSubmit(this.state.searchQuery);
        this.setState({searchQuery: ''})
    };


    render() {
        return (
            <header className="searchbar">
                <form className="form" onSubmit={this.handleSubmit}>
                    <button type="submit" className="button" aria-label='search-button'>
                        <GoSearch width='28' height='28' fill='#1a1212' />
                    </button>

                    <input
                        className="input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        value={this.state.searchQuery}
                        placeholder="Search images and photos"
                        onChange={this.handleSearch}
                    />
                </form>
            </header>
        )
    }
};