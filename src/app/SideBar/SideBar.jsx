import React from 'react';
import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import {navPath} from 'shared/navPath';

const SideBar = () => {
  return (
    <Aside>
      <div>
        <Nav>
          <NavBox>
            <LogoBox>
              <Logo to="/">IMPEKABLE</Logo>
            </LogoBox>
            {navPath.map(sideBarItem =>(
              <List key={sideBarItem.name}>
                <Navigation to={sideBarItem.path} exact={sideBarItem.path === "/"}>
                  <Title>{sideBarItem.name}</Title>
                </Navigation>
              </List>
              ))
            }
          </NavBox>
        </Nav>
      </div>
    </Aside>
  )
}

export default SideBar;

const Aside = styled.aside`
  background: white;
  flex: 0 1 250px;
  min-width: 250px;
  position: relative;
  z-index: 5;
  transition: all 0s;
`;
const LogoBox = styled.li`
  height: 50px;
  display: flex;
  align-items: center;
  background-color: #3c3b54;
`;
const Logo = styled(Link)`
  position: relative;
  color: white;
  width: 160px;
  z-index: 1;
  text-decoration: none;
  padding-left: 5px;
  font-size: 15px;
`;
const Nav = styled.nav`
  position: relative;
`;
const NavBox = styled.ul`
  display: block;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 160px; 
  position: fixed; 
  top: 0;
  left: 0;
  background-color: #43425D;
  overflow-x: hidden; 
`;
const List = styled.li`
  display: block;
  margin: 0 0 2px;
  padding: 0;
  & a {
    padding-left: 5px;
    display: flex;
    align-items: center;
  }
`;
const Navigation = styled(NavLink)`
  display: block;
  color: #adacb8;
  position: relative;
  font-size: 14px;
  text-decoration: none;
  // transition: all .2s;
  min-height: 36px;
  &.active {
    
    background: #3c3b54;
    color: white;
    // &::before{
    //   content: '';
    //   width: 12px;
    //   background-color: #a3a0fb !important;
    // }  
  };

  }
`;
const Title = styled.span``;