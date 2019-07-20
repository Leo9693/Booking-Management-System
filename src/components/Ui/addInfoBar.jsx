import React, { Component } from 'react';
import {LoadingButton} from './Button.jsx';
import { Link } from 'react-router-dom';

export default class AddInfoBar extends Component {
    render() {
        const {
            addInfoTitle,
            addInfoSelectorName,
            addInfoSelectorList = ["businessName"],
            addInfoValue,
            isLoading, 
            linkPath,
            handleInputChange,
            handleAddClick,
        } = this.props;
        return (
            <div>
                {addInfoSelectorList &&
                    <form className="form-inline py-3 px-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">{addInfoTitle}</span>
                        </div>
                        <select className="form-control mr-1"
                                name={addInfoSelectorName} onChange={handleInputChange}
                        >
                            {addInfoSelectorList.map((item) => (
                                <option key={item} value={item}>By {item}</option>
                            ))}
                        </select>
                        <input  className="form-control mr-1" type="text"
                            style={{width:"300px"}}
                            placeholder="Input add info..."
                            name={addInfoValue} onChange={handleInputChange}
                        />
                        <LoadingButton className="btn mr-2" buttonStyle="btn-outline-primary" type="submit" disabled={isLoading}
                            onClick={handleAddClick}
                        >
                            ADD
                        </LoadingButton>
                        <Link  to={`/${linkPath}`} className="ml-auto">
                            <button className="btn btn-secondary">
                                Back to {linkPath} overview
                            </button>
                        </Link>
                    </form>
                }
            </div>
        )
    }
    
        
}

 