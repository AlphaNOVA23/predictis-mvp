import React from 'react';
import { Navbar, Nav, InputGroup, FormControl, Dropdown } from 'react-bootstrap';
import { Search, BellFill } from 'react-bootstrap-icons';

export default function Header() {
  return (
    <Navbar bg="light" expand="lg" className="px-4 border-bottom">
      <Navbar.Brand href="/" className="fw-bold fs-4 d-flex align-items-center">
        <img
          src="/logo.png" // The logo is now referenced from the public folder
          width="60"
          height="60"
          className="d-inline-block align-top me-2"
          alt="Predictis logo"
        />
        PREDICTIS
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {/* Future Nav Links can go here */}
        </Nav>
        <div className="d-flex align-items-center">
          <InputGroup className="search-input me-3">
            <InputGroup.Text id="basic-addon1" className="bg-transparent border-end-0">
              <Search size={18} />
            </InputGroup.Text>
            <FormControl
              placeholder="Search..."
              aria-label="Search"
              aria-describedby="basic-addon1"
              className="border-start-0 shadow-none"
            />
          </InputGroup>
          <BellFill size={22} className="me-4 text-secondary" />
          <Dropdown align="end">
            <Dropdown.Toggle variant="transparent" id="dropdown-basic" className="p-0 border-0">
              <img 
                src="https://placehold.co/40x40/5e81ac/white?text=A" 
                alt="Admin User" 
                className="rounded-circle"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}