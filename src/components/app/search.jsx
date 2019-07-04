import React, { Component } from 'react';
import { connect } from 'react-redux'

class Search extends Component {

    render() {
        return (
            <form class="form-inline">
                <input className="form-control mr-1" type="search" placeholder="Search Keyword..." />
                <select class="form-control mr-1">
                <option value="searchAll">Search All</option>
                <option value="categoryName">Category Name</option>
                </select>

                <button className="btn btn-outline-success" type="button">
                    Search
                </button>

            </form>
        )
    }
}

export default Search;