import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { 
  Grid1x2Fill, 
  GraphUp, 
  PeopleFill, 
  MegaphoneFill, 
  ClockHistory, 
  GearFill 
} from 'react-bootstrap-icons';

const navItems = [
  { to: "/dashboard", icon: <Grid1x2Fill className="me-2" />, text: "Dashboard" },
  { to: "/insights", icon: <GraphUp className="me-2" />, text: "Predictive Insights" },
  { to: "/resources", icon: <PeopleFill className="me-2" />, text: "Resource Management" },
  { to: "/advisories", icon: <MegaphoneFill className="me-2" />, text: "Advisories & Comm." },
  { to: "/history", icon: <ClockHistory className="me-2" />, text: "Historical Data" },
  { to: "/settings", icon: <GearFill className="me-2" />, text: "Settings" }
];

export default function Sidebar() {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 sidebar">
      <Nav variant="pills" className="flex-column mb-auto">
        {navItems.map((item, index) => (
          <Nav.Item key={index} className="mb-1">
            <Nav.Link as={NavLink} to={item.to} className="d-flex align-items-center">
              {item.icon}
              {item.text}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
}