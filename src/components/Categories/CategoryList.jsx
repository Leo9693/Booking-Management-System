import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { LARGE } from '../../utils/constant';

export default function CategoryList(props) {
    const { screenType, documentsList, onClickUpdate, onClickDelete } = props;
    return (
        <table className="my-3 table">
            <thead>
                {screenType === LARGE ?
                    (
                        <tr className="row">
                            <th className="col-2">Service</th>
                            <th className="col-6">Description</th>
                            <th className="col-4">Operation</th>
                        </tr>
                    )
                    : (
                        <tr className="row">
                            <th className="col-4">Service</th>
                            <th className="col-8">Operation</th>
                        </tr>
                    )
                }
            </thead>
            <tbody>
                {screenType === LARGE
                    ? (
                        documentsList.map((item) => (
                            <tr key={item._id} className="row">
                                <td className="col-2">{item.name}</td>
                                <td className="col-6">{item.description}</td>
                                <td className="col-4">
                                    <Link to={`/categories/${item._id}`}>
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
                        )))
                    : (
                        documentsList.map((item) => (
                            <tr key={item._id} className="row">
                                <td className="col-4">{item.name}</td>
                                <td className="col-8">
                                    <Link to={`/categories/${item._id}`}>
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
                        ))
                    )
                }
            </tbody>
        </table>
    )
}