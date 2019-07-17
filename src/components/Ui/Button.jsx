import React from 'react';
import classnames from 'classnames';

export default function Button(props) {
    const {
        children,
        className='btn',
        buttonStyle='btn btn-outline-secondary',
        type = 'button',
        ...rest
    } = props;

    return (
    
        <button className={classnames(className, buttonStyle)}
                type={type} {...rest}
        >
            {console.log(1)}
            {children}
        </button>
    );
}

export function LoadingButton(props) {
    const {
        children,
        isLoading=false,
        ...rest
    } = props;

    return (
        <Button className="btn btn-primary" disabled={isLoading} {...rest}>
            {isLoading && <i className="fa fa-circle-o-notch fa-pulse fa-fw" />}
            {children}
        </Button>
    )
}