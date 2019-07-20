import React from 'react';

export default function FlexView({ children, row, style, ...rest }) {
  const dir = row ? 'row' : 'column';
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: dir,
        ...style,
      }}
      {...rest}>
      {children}
    </div>
  );
}
