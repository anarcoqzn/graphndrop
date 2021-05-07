import React, { useEffect } from 'react'
import { Container } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../Button/';
import { getConnections, setConnection } from '../../services/actions/userActions';

export default function InitialPage(props) {
  const dataBases = useSelector(state => state.dataBases);
  const { loading, connections, error } = dataBases;
  const dispatch = useDispatch();

  const handleConnClick = (connection) => {
    dispatch(setConnection(connection.id));
    props.history.push('/home/' + connection.id);
  }

  useEffect(() => {
    dispatch(getConnections());
  }, [dispatch]);

  return (
    <Container>
      {loading ? <div>Loading your connections</div> :
        error ? <div>Error at loading your connections</div> :
          <div>
            <h1>Your Databases</h1>
            <ul>
              {
                connections.map((conn,i) => {
                  return <li key={i} style={i%2===0?{backgroundColor:"#A9A9A9"}:{backgroundColor:"#DCDCDC"}} onClick={()=>handleConnClick(conn)}>
                    {conn.dbName}
                  </li>
                })
              }              
              <Button id="new-conn" color="darkorange" onClick={()=> {props.history.push('/connect')}}>NOVO</Button>
            </ul>
          </div>
      }
    </Container>
  )
}
