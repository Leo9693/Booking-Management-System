import React, { Component } from 'react';
import { LoadingButton } from './Button.jsx';

export default class SubTopBar extends Component {
    render() {
        const { title, searchList, sortList, isLoading } = this.props;
        const { onSearch, onInputChange, onShowCreateModal } = this.props;
        return (
            <form className='form-inline bg-light py-3 px-3'>
                <div className="row" style={{ width: "100%" }}>
                    <div className="col-md-12 col-xl-2">
                        <button className="btn btn-success mr-auto"
                            onClick={onShowCreateModal}
                        >
                            {title}
                        </button>
                    </div>
                    <div className="col-md-12 col-xl-7">
                        <input
                            className='form-control mr-1'
                            type='search'
                            placeholder='Search Keyword...'
                            name='searchValue'
                            onChange={onInputChange}
                        />
                        <select
                            className='form-control mr-1'
                            name='searchField'
                            onChange={onInputChange}
                        >
                            <option value='searchAll'>Search All</option>
                            {searchList &&
                                searchList.map(item => (
                                    <option key={item} value={item}>
                                        Search by {item}
                                    </option>
                                ))}
                        </select>
                        <LoadingButton
                            className='btn mr-1'
                            buttonStyle='btn-outline-primary'
                            type='submit'
                            onClick={onSearch}
                            isLoading={isLoading}
                        >
                            Search
                        </LoadingButton>
                    </div>
                    <div className="col-md-12 col-xl-3">
                        {sortList && (
                            <div className='input-group' style={{ width: "220px" }}>
                                <div className='input-group-prepend'>
                                    <span className='input-group-text'>Sort By: </span>
                                </div>
                                <select
                                    className='form-control mr-1'
                                    name='sortType'
                                    onChange={onInputChange}
                                >
                                    {sortList.map(item => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        );
    }
}
