import React from 'react';
import logo from '../images/logo.svg';

function Header() {

    return (
        <div className="header">
            <img src={logo} className="logo-top" alt="Logo My Moviz"/>
            <h1>MOVIES </h1>
        </div>
    );
}

export default Header;