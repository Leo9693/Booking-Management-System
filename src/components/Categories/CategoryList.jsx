import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { LARGE, SEARCH_ALL } from '../../utils/constant';

export default function CategoryList(props) {
    const { screenType, documentsList, searchField, onClickUpdate, onClickDelete } = props;
    const isLargeScreen = (screenType === LARGE);

    return (
        <table className="my-3 table">
            <thead>
                <tr className="row">
                    {(isLargeScreen || searchField === 'name' || searchField === SEARCH_ALL)
                        && <th className="col-6 col-sm-3">Service</th>}
                    {(isLargeScreen || searchField === 'description')
                        && <th className="col-6">Description</th>}
                    <th className="col-6 col-sm-3 operation-col">Operation</th>
                </tr>
            </thead>
            <tbody>
                {documentsList.map((item) => (
                    <tr key={item._id} className="row">
                        {(isLargeScreen || searchField === 'name' || searchField === SEARCH_ALL)
                            && <td className="col-6 col-sm-3">{item.name}</td>}
                        {(isLargeScreen || searchField === 'description')
                            && <td className="col-6">{item.description}</td>}
                        <td className="col-6 col-sm-3 operation-col">
                            {/* <Link to={`/categories/${item._id}`}>
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