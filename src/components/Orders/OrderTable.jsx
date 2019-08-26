import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { LARGE, SEARCH_ALL } from '../../utils/constant';
import { getLocalDateAndTime } from '../../utils/dateTransform';

export default function BusinessList(props) {
    const { screenType, searchField, documentsList, onClickUpdate, onClickDelete } = props;
    const isLargeScreen = (screenType === LARGE);
    return (
        <table className="my-3 table">
            <thead>
                <tr className="row">
                    {(isLargeScreen || searchField === SEARCH_ALL)
                        && <th className="col-6 col-sm-3">Order Date</th>}
                    {(isLargeScreen || searchField === 'customer')
                        && <th className="col-6 col-sm-2">Customer</th>}
                    {(isLargeScreen || searchField === 'business')
                        && <th className="col-6 col-sm-2">Business</th>}
                    {(isLargeScreen || searchField === 'category')
                        && <th className="col-6 col-sm-2">Category</th>}
                    <th className="col-6 col-sm-3 operation-col">Operation</th>
                </tr>
            </thead>
            <tbody>
                {documentsList.map((item) => (
                    <tr key={item._id} className="row">
                        {(isLargeScreen || searchField === SEARCH_ALL)
                            && <td className="col-6 col-sm-3">{getLocalDateAndTime(item.createdAt)}</td>}
                        {(isLargeScreen || searchField === 'customer')
                            && <td className="col-6 col-sm-2">{item.customer}</td>}
                        {(isLargeScreen || searchField === 'business')
                            && <td className="col-6 col-sm-2">{item.business}</td>}
                        {(isLargeScreen || searchField === 'category')
                            && <td className="col-6 col-sm-2">{item.category}</td>}
                        <td className="col-6 col-sm-3 operation-col">
                            {/* <Link to={`/businesses/${item._id}`}>
                                <button
                                    type="button"
                                    className="btn btn-info btn-sm mr-2 px-1"
                                    style={{ width: "30px" }}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Details"
                                >
                                    <FontAwesomeIcon icon={faInfo} />
                                </button>
                            </Link> */}
                            <button
                                type="button"
                                className="btn btn-warning btn-sm mr-2"
                                style={{ width: "30px" }}
                                onClick={() => onClickUpdate(item._id)}
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Edit"
                            >
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                style={{ width: "30px" }}
                                onClick={() => onClickDelete(item._id)}
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Delete"
                            >
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}