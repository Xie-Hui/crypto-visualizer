import React from 'react';
import { Nav } from 'mui-layout';
import NavHeader from './NavHeader';
import NavContent from './NavContent';
import LeftIcon from '@material-ui/icons/ChevronLeft';
import RightIcon from '@material-ui/icons/ChevronRight';

const CustomNav = (props) => (
    <Nav
        renderIcon={(collapsed) => (collapsed ? <RightIcon /> : <LeftIcon />)}
        header={({ collapsed }) => <NavHeader collapsed={collapsed} />}
    >
        <NavContent {...props} />
    </Nav>
);

export default CustomNav;
