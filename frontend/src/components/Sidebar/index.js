import React from 'react'
import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarLink, SidebarRoute, SideBtnWrap, SidebarMenu } from './SidebarElements';
import Logout from '../../pages/Logout';
// import Register from '../../pages/Register';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggle }) => {
  const navigate = useNavigate();

  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon/>
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink activeStyle onClick={() => navigate('/join')}>
            Play
          </SidebarLink>
          <SidebarLink activeStyle onClick={() => navigate('/register')}>
            Register
          </SidebarLink>
          <SidebarLink to='/quiz' activeStyle onClick={() => navigate('/quiz')}>
            Dashboard
          </SidebarLink>
          <SidebarLink activeStyle onClick={ () => { Logout(); navigate('/login') } }>
            Logout
          </SidebarLink>
          <SideBtnWrap>
            <SidebarRoute to='/login'>Sign In</SidebarRoute>
          </SideBtnWrap>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  )
}

Sidebar.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool
};

export default Sidebar;
