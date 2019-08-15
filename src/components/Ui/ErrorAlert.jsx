import React from 'react';
import { Alert } from 'antd';

export default function ErrorAlert(props) {
    const {
        message = 'Error',
        type = 'error',
        description = '',
        ...rest
    } = props;
    
    return (    
        <Alert
            className="error-alert"
            message={message}
            type={type}
            description={description}
            closable
            showIcon
            {...rest}
        />
    );
}