/** @format */

import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import imgLogo from './../../img/download.png';
import NavLinks from './NavLinks';
import './Navbar.css';
//import Button from './../../atoms/Button';

const Header = () => {
  return (
    <Navbar className="todo-app-navbar" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            className="tv2z-logo"
            alt="TV2Z"
            src={imgLogo}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <NavLinks />
      </Container>
    </Navbar>
  );
};

export default Header;
