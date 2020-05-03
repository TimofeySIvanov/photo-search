// Importing components
import React, { Component } from 'react';
import {withRouter } from 'react-router-dom';


class Form extends Component {
    // Clearing text of search
    state = {
        searchRequest: ''
    }

    onSearchChange = e => {
        this.setState({ searchRequest: e.target.value });
    }
    //On submiting request this is what happens
    handleSubmit = e => {
        e.preventDefault();
        this.props.onSearch(this.query.value);
        let searching_word = this.query.value;
        let path = `/search/${searching_word}`;
        this.props.history.push(path);
        e.currentTarget.reset();
    }
    //rendering form
    render() {
        return (
            <form className="search-form" onSubmit={this.handleSubmit}>
                <input type="search"
                    name="Search_photos"
                    placeholder="Search photos"
                    ref={input => this.query = input}
                    onChange={this.onSearchChange}
                />
                <button type="submit" className="search-button">
                <img src="https://img.icons8.com/android/24/000000/search.png" alt="search icon"/>
                </button>
            </form>
        );
    }

}

export default withRouter(Form);
