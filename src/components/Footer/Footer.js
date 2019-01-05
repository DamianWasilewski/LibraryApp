import React from 'react';

import './Footer.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  //Adding icon from FontAwesome library
  library.add(fab);
  return (
  <div className="footer">
    <div className="footer__Content">
      <div className="footer__Content-text">
      Made by Damian Wasilewski
      </div>
      <div className="footer__Content-socialMedia">
      <a href="https://www.linkedin.com/in/damian-wasilewski-b01461176/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={['fab', 'linkedin']} /></a>
      <a href="https://github.com/DamianWasilewski" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={['fab', 'github']} /></a>
      <a href="https://www.facebook.com/damian.wasilewski.733" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={['fab', 'facebook']} /></a>
      </div>
    </div>
  </div>
  )
}

export default Footer;