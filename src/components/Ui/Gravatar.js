import React from 'react';
// import gravatarUrl from 'gravatar-url';

import avatar_default from '../img/avatar_default.png';

function Gravatar({ email, photoURL, size = 100, style, ...rest }) {
  return (
    <img
      className="img-circle jr-gravatar"
      src={photoURL || avatar_default}
      alt="gravatar"
      style={{ ...style, width: size, height: size }}
      {...rest}
    />
  );
}

export default Gravatar;
