import React from 'react';
import { Navbar, InputGroup, FormControl, Dropdown, Image, Badge } from 'react-bootstrap';
import { Search, BellFill } from 'react-bootstrap-icons';

export default function Header() {
  return (
    <Navbar bg="white" expand="lg" className="header px-3" sticky="top">
      <Navbar.Brand href="/" className="fw-bold fs-4 d-flex align-items-center">
        <img
          src="/logo.png"
          width="30"
          height="30"
          className="d-inline-block align-top me-2"
          alt="Predictis logo"
        />
        PREDICTIS
      </Navbar.Brand>
      
      {/* Spacer to push content to the right */}
      <div className="flex-grow-1"></div>

      {/* Search Bar */}
      <div className="header-search me-3 d-none d-lg-block">
        <InputGroup>
          <InputGroup.Text id="search-icon" className="bg-light border-0">
            <Search size={18} />
          </InputGroup.Text>
          <FormControl
            placeholder="Search data, reports, or patients..."
            aria-label="Search"
            className="bg-light border-0 shadow-none"
          />
        </InputGroup>
      </div>

      {/* Icons and User Dropdown */}
      <div className="d-flex align-items-center">
        <div className="header-icon-wrapper me-3">
          <BellFill size={20} className="text-secondary" />
          <Badge pill bg="danger" className="header-notification-badge">
            3
          </Badge>
        </div>
        
        <Dropdown align="end">
          <Dropdown.Toggle variant="transparent" id="dropdown-user" className="p-0 border-0">
            <Image
              src="https://placehold.co/40x40/0d6efd/white?text=Dr"
              alt="Dr. Sharma"
              roundedCircle
              className="header-avatar"
            />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.ItemText className="fw-bold">Dr. Sharma</Dropdown.ItemText>
            <Dropdown.Divider />
            <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
            <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#/logout" className="text-danger">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Navbar>
  );
}