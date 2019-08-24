import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { LARGE } from '../../utils/constant';

export default function BusinessList(props) {
    const { screenType, searchField, documentsList, onClickUpdate, onClickDelete } = props;
    const isLargeScreen = (screenType === LARGE);
    return (
        <table className="my-3 table">
            <thead>
                <tr className="row">
                    {(isLargeScreen || searchField === 'name' || searchField === 'searchAll')
                        && <th className="col-6 col-sm-2">Name</th>}
                    {(isLargeScreen || searchField === 'email')
                        && <th className="col-6 col-sm-3">Email</th>}
                    {(isLargeScreen || searchField === 'phone')
                        && <th className="col-6 col-sm-2">Phone</th>}
                    {(isLargeScreen || searchField === 'postcode')
                        && <th className="col-6 col-sm-2">Postcode</th>}
                    <th className="col-6 col-sm-3 operation-col">Operation</th>
                </tr>
            </thead>
            <tbody>
                {documentsList.map((item) => (
                    <tr key={item._id} className="row">
                        {(isLargeScreen || searchField === 'name' || searchField === 'searchAll')
                            && <td className="col-6 col-sm-2">{item.name}</td>}
                        {(isLargeScreen || searchField === 'email')
                            && <td className="col-6 col-sm-3">{item.email}</td>}
                        {(isLargeScreen || searchField === 'phone')
                            && <td className="col-6 col-sm-2">{item.phone}</td>}
                        {(isLargeScreen || searchField === 'postcode')
                            && <td className="col-6 col-sm-2">{item.postcode}</td>}
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