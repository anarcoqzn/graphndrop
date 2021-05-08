import React from 'react';
import { useSelector } from 'react-redux';
import { Error } from '../../Loading&Error';
import { Container } from './styles';

function Header({ props }) {
  const { loading, selectedConnection, error } = useSelector(state => state.selectedConnection);

  return (
    loading ? null :
    error ? <Error msg={`#!ERROR: ${error.data.errorNum} STATUS:${error.status}`} /> :
        
    <Container>
      <h1>{selectedConnection.dbName}</h1>
      <h2 onClick={()=>props.history.push('/')}>My Connections</h2>
    </Container>
  )
}

export default Header;