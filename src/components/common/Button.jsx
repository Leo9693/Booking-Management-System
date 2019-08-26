import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

export default function Button({
    children,
    className,
    primary,
    danger,
    linkTo,
    type = 'button',
    ...rest
}) {
    if (linkTo) {
        return (
            <Link
                to={linkTo}
                className={classnames('btn-borderless', className)}
                {...rest}
            >
                {children}
            </Link>
        );
    }
    return (
        <button
            className={classnames('btn', className)}
            type={type}
            {...rest}
        >
            {children}
        </button>
    );
}

export function LoadingButton({ children, loading, ...rest }) {
    return (
        <Button primary disabled={loading} {...rest}>
            {loading && <i className='fa fa-circle-o-notch fa-pulse fa-fw' />}
            {children}
        </Button>
    );
}
