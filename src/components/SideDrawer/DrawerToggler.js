import React from 'react';

import './DrawerToggler.css';

const drawerToggler = props => (
  <button className='side-drawer-toggle-button' onClick={props.click}>
    <div className="side-drawer-toggle-button__line"></div>
    <div className="side-drawer-toggle-button__line"></div>
    <div className="side-drawer-toggle-button__line"></div>
  </button>
);

export default drawerToggler;