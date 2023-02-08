import { Component } from 'react';
import { ReactComponent as IconSearch } from '../../icons/iconSearch.svg'

 
export class SearchBar extends Component {

    state = {
        searchQuery: ''
    }

    handleSearch = e => {
        this.setState({ searchQuery: e.currentTarget.value })
    };
    handleSubmit = e => {
        e.preventDefault();
        console.log("submit stRT")
}

    render() {
        return (
            <header className="searchbar">
                <form className="form" onSubmit={this.handleSubmit}>
                    <button type="submit" className="button" aria-label='search-button'>
                        <IconSearch width='28' height='28' fill='#1a1212' />
                    </button>

                    <input
                        className="input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.handleSearch}
                    />
                </form>
            </header>
        )
    }
};