import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { HouseDoorFill, GraphUp, PersonVcard, MegaphoneFill, ClockHistory, GearFill } from 'react-bootstrap-icons';

// A helper component for sidebar items
const SidebarNavItem = ({ to, icon, text }) => (
    <LinkContainer to={to}>
        <Nav.Link className="sidebar-link d-flex align-items-center">
            {icon}
            <span className="ms-3">{text}</span>
        </Nav.Link>
    </LinkContainer>
);

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Nav className="flex-column" defaultActiveKey="/dashboard">
                <SidebarNavItem to="/dashboard" icon={<HouseDoorFill size={20} />} text="Dashboard" />
                <SidebarNavItem to="/insights" icon={<GraphUp size={20} />} text="Predictive Insights" />
                <SidebarNavItem to="/resources" icon={<PersonVcard size={20} />} text="Resource Management" />
                <SidebarNavItem to="/advisories" icon={<MegaphoneFill size={20} />} text="Advisories & Comm." />
                <SidebarNavItem to="/history" icon={<ClockHistory size={20} />} text="Historical Data" />
                <SidebarNavItem to="/settings" icon={<GearFill size={20} />} text="Settings" />
            </Nav>
        </div>
    );
};

export default Sidebar;

