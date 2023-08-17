import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src="/static/images/SGI-Logo.png"
      {...props}
      style={{width:"50px",height:"50px"}}
    />
  );
};

export default Logo;
