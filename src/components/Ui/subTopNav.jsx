import React, { Component } from 'react';
import { LoadingButton } from './Button.jsx';
import { Link } from 'react-router-dom';

export default class SubTopNav extends Component {
  render() {
    const { title, titleLink, searchList, sortList, isLoading } = this.props;
    const { handleInputChange, search } = this.props;
    return (
      <form className='form-inline bg-light py-3 px-3'>
        {titleLink ? (
          <Link to={titleLink} className='mr-auto btn btn-primary'>
            {title}
          </Link>
        ) : (
          <label className='mr-auto'>{title}</label>
        )}
        <input
          className='form-control mr-1'
          type='search'
          placeholder='Search Keyword...'
          name='searchKeyword'
          onChange={handleInputChange}
        />
        <select
          className='form-control mr-1'
          name='searchFilter'
          onChange={handleInputChange}
        >
          <option value='searchAll'>Search All</option>
          {searchList &&
            searchList.map(item => (
              <option key={item} value={item}>
                Search by {item}
              </option>
            ))}
          {/* <option value="name">Search By Name</option> */}
        </select>
        {console.log('isLoading111' + isLoading)}
        <LoadingButton
          className='btn mr-2'
          buttonStyle='btn-outline-primary'
          type='submit'
          onClick={search}
          isLoading={isLoading}
        >
          Search
        </LoadingButton>
        {sortList && (
          <div className='input-group'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Sort By: </span>
            </div>
            <select
              className='form-control mr-1'
              name='sortKey'
              onChange={handleInputChange}
            >
              {sortList.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        )}
      </form>
    );
  }
}
