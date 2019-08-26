import React, { Component } from 'react';
import { LoadingButton } from './Button.jsx';
import { SEARCH_ALL } from '../../utils/constant'

export default class SearchBar extends Component {
    render() {
        const { searchList, isLoading, searchValue, onSearch, onInputChange } = this.props;

        return (
            <form className='form-inline bg-light py-2 pl-3'>
                <div className="row" style={{ width: "100%" }}>
                    <input
                        className='form-control col-12 col-sm-4 col-lg-2'
                        type='search'
                        placeholder='Search Keyword...'
                        name='searchValue'
                        value={searchValue}
                        onChange={onInputChange}
                    />
                    <select
                        className='form-control col-9 col-sm-4 col-lg-2'
                        name='searchField'
                        onChange={onInputChange}
                    >
                        <option value={SEARCH_ALL}>Search All</option>
                        {searchList &&
                            searchList.map(item => (
                                <option key={item} value={item}>
                                    Search by {item}
                                </option>
                            ))}
                    </select>
                    <LoadingButton
                        className='btn btn-outline-primary col-3 col-sm-2 col-lg-1'
                        type='submit'
                        onClick={onSearch}
                        isLoading={isLoading}
                    >
                        Search
                    </LoadingButton>
                </div>
            </form>
        )
    }
}