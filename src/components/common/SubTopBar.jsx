import React, { Component } from 'react';
import { LoadingButton } from './Button.jsx';
import { SEARCH_ALL } from '../../utils/constant'

export default class SubTopBar extends Component {
    render() {
        const { title, searchList, sortList, isLoading, searchValue } = this.props;
        const { onSearch, onInputChange, onShowCreate } = this.props;
        return (
            <form className='form-inline bg-light py-3 px-2'>
                <div className="row no-gutters" style={{ width: "100%" }}>
                    <div className="col-md-12 col-xl-2">
                        <button className="btn btn-success mr-auto"
                            onClick={onShowCreate}
                        >
                            + {title}
                        </button>
                    </div>
                    <div className="col-md-12 col-xl-6 offset-xl-1">
                        <div className="row mx-0">
                            <input
                                className='form-control col-12 col-sm-4 col-lg-4'
                                type='search'
                                placeholder='Search Keyword...'
                                name='searchValue'
                                value={searchValue}
                                onChange={onInputChange}
                            />
                            <select
                                className='form-control col-8 col-sm-5 col-lg-4'
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
                                className='btn btn-outline-primary col-4 col-sm-3 col-lg-2'
                                type='submit'
                                onClick={onSearch}
                                isLoading={isLoading}
                            >
                                Search
                        </LoadingButton>
                        </div>
                    </div>
                    <div className="offset-n1 col-md-12 col-xl-2">
                        {sortList && (
                            <div
                                className='input-group'
                                style={{ width: "240px" }}
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Click 'Search' to sort again"
                            >
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
