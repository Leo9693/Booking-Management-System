import React from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

import Button from './Button';

class ConfirmModal extends React.Component {
  constructor() {
    super();
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.onClose();
  }

  handleConfirm() {
    this.props.onConfirm();
    this.props.onClose();
  }

  render() {
    return (
      <div>
        {this.props.show && (
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose}>
              <div className="jr-modal">
                <div className="jr-modal__caption">Are you sure to continue?</div>
                <div className="jr-modal__buttons">
                  <Button
                    primary
                    onClick={this.handleConfirm}
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={this.handleClose}
                    style={{ marginLeft: 10 }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </ModalDialog>
          </ModalContainer>
        )}
      </div>
    );
  }
}

export default ConfirmModal;
