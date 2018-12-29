import React from 'react';

import './DrawerToggler.css';

const drawerToggler = props => (
  <button className='toggle-button' onClick={props.click}>
    <div className="toggle-button__line"></div>
    <div className="toggle-button__line"></div>
    <div className="toggle-button__line"></div>
  </button>
);

export default drawerToggler;