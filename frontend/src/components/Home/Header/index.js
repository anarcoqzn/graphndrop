import Cookies from 'js-cookie';
import React from 'react';
import { Container } from './styles';

function Header({ props }) {
  const selectedConnection = Cookies.getJSON('selectedConnection');
  
  return (
    <Container>
      <h1>{selectedConnection.dbName}</h1>
      <h2 onClick={()=>props.history.push('/')}>My Connections</h2>
    </Container>
  )
}

export default Header;