import React, { Component } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';

export default class CreateAndUpdateModal extends Component {

    render() {
        const {
            isShow = false,
            type = 'Create',
            title = 'Data',
            inputList = [],
            inputValue = {},
            errorInfo = '',
            onInputChange,
            onCancel,
            onSubmit,
        } = this.props;
        return (
            <Modal show={isShow} onHide={onCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>{`${type} ${title}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form validated className="mx-2">
                        {inputList && inputList.map(item => (
                            <Form.Group key={item} as={Row}>
                                <Form.Label column sm={3}>{item}</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder={`${type} ${title} ${item}`}
                                        value={inputValue[item]}
                                        name={item}
                                        onChange={onInputChange} />
                                </Col>
                            </Form.Group>
                        ))}
                    </Form>
                    {errorInfo && <div style={{ color: "red" }}>Warning: {errorInfo.response.data}</div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={onSubmit}>
                        {type}
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}