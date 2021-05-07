import React from 'react';

import { Container } from './styles';

function Header({props}) {
  return (
  <Container>
      <h1>DB NAME</h1>
      <h2 onClick={()=>props.history.push('/')}>My Connections</h2>
  </Container>
  )
}

export default Header;