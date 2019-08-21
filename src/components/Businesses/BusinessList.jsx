import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { LARGE } from '../../utils/constant';

export default function BusinessList(props) {
    const { screenType, documentsList, onClickUpdate, onClickDelete } = props;
    return (
        <table className="my-3 table">
            <thead>
                <tr className="row">
                    <th className="col-4 col-sm-2">Name</th>
                    {screenType === LARGE && (
                        <Fragment>
                            <th className="col-3">Email</th>
                            <th className="col-2">Phone</th>
                            <th className="col-2">Postcode</th>
                        </Fragment>
                    )}
                    <th className="col-8 col-sm-3">Operation</th>
                </tr>
            </thead>
            <tbody>
                {documentsList.map((item) => (
                    <tr key={item._id} className="row">
                        <td className="col-4 col-sm-2">{item.name}</td>
                        {screenType === LARGE && (
                            <Fragment>
                                <td className="col-3">{item.email}</td>
                                <td className="col-2">{item.phone}</td>
                                <td className="col-2">{item.postcode}</td>
                            </Fragment>
                        )}
                        <td className="col-8 col-sm-3">
                            <Link to={`/businesses/${item._id}`}>
                                <button
                                    type="button"
                                    className="btn btn-info btn-sm mr-4 px-1"
                                    style={{ width: "30px" }}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Details"
                                >
                                    <FontAwesomeIcon icon={faInfo} />
                                </button>
                            </Link>
                            <button
                                type="button"
                                className="btn btn-warning btn-sm mr-4"
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
                                className="btn btn-danger btn-sm mr-4"
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