import React, { useState } from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../actions/userAction";

const Header = () => {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownClicked, setDropdownClicked] = useState(false);

  const logoutHandler = () => {
    dispatch(logout());
    setShowDropdown(false);
    setDropdownClicked(false);
  };

  const dropdownMenuStyle = {
    backgroundColor: '#343a40',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  };

  const dropdownItemStyle = {
    color: '#ffffff',
  };

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    if (!dropdownClicked) {
      setShowDropdown(false);
    }
  };

  const handleDropdownClick = () => {
    setDropdownClicked(!dropdownClicked);
    setShowDropdown(!dropdownClicked);
  };

  const handleItemClick = () => {
    setShowDropdown(false);
    setDropdownClicked(false);
  };

  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Abharole</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <Nav className="ml-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <LinkContainer to='/'>
                <Nav.Link>
                  <i className="fa-solid fa-home"></i>&nbsp; Home
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className="fa-solid fa-cart-shopping"></i>&nbsp; Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id='username'
                  show={showDropdown}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleDropdownClick}
                  style={{ color: '#ffffff' }}
                  menuVariant="dark"
                >
                  <NavDropdown.Item as="div" style={{ padding: 0 }}>
                    <div style={dropdownMenuStyle}>
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item style={dropdownItemStyle} onClick={handleItemClick}>Profile</NavDropdown.Item>
                      </LinkContainer>

                      <NavDropdown.Item onClick={logoutHandler} style={dropdownItemStyle}>
                        Logout
                      </NavDropdown.Item>
                    </div>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className="fa-solid fa-user"></i>&nbsp; Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
