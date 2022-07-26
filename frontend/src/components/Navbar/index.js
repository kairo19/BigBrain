import React from 'react'
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElements'
import Register from '../../pages/Register';
import Logout from '../../pages/Logout';
import { FaBars } from 'react-icons/fa'
import Dashboard from '../../pages/Dashboard';
import PropTypes from 'prop-types';
import SessionJoin from '../../pages/SessionJoin';

const Navbar = ({ toggle }) => {
  return (
    <div>
      <Nav>
        <NavLink to='/'>
          <h1>BigBrain</h1>
        </NavLink>
        {/* <Bars /> */}
        <Bars onClick={toggle}>
          <FaBars onClick={toggle}/>
        </Bars>
        <NavMenu>
          <NavLink to='/join' element={<SessionJoin />}>
            Play
          </NavLink>
          <NavLink to='/register' element={<Register />}>
            Register
          </NavLink>
          <NavLink to='/quiz' element={<Dashboard />}>
            Dashboard
          </NavLink>
          <NavLink to='/logout' onClick={() => Logout()}>
            Logout
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/login'>Login</NavBtnLink>
        </NavBtn>
      </Nav>
    </div>
  )
}

export default Navbar;

Navbar.propTypes = {
  toggle: PropTypes.func
};
