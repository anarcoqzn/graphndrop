import React, { useEffect, useState } from 'react'
import { ConnectionItem, ConnectionsContainer, Container } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../Button/';
import { deleteConnection, getConnections, setConnection } from '../../services/actions/userActions';
import { BsTrash } from 'react-icons/bs';
import { Loading, Error } from '../Loading&Error';

export default function InitialPage(props) {
  const dataBases = useSelector(state => state.dataBases);
  const { loading, connections, error } = dataBases;
  const [reload, setReload] = useState(false);

  const dispatch = useDispatch();

  const handleConnClick = (connection) => {
    dispatch(setConnection(connection.id));
    props.history.push('/home/' + connection.id);
  }

  const handleDeleteConnection = (connection) => {
    dispatch(deleteConnection(connection.id));
    setReload(prev => !prev);
  }

  useEffect(() => {
    dispatch(getConnections());
  }, [dispatch, reload]);

  return (
    <Container>
      {loading ? <Loading msg={"Loading your connections"}/> :
        error ? <Error msg={`Error at loading your connections. ERROR:${error.data.errorNum} STATUS:${error.status}`}/> :
          <div>
            <h1>Your Databases</h1>
            <ul>
              {
                connections.map((conn,i) => {
                  return <ConnectionsContainer key={i} index={i}>
                    <ConnectionItem onClick={() => handleConnClick(conn)}>
                      {conn.dbName}
                    </ConnectionItem>
                    <BsTrash size={30} onClick={()=>handleDeleteConnection(conn)}/>
                  </ConnectionsContainer>
                })
              }              
              <Button id="new-conn" color="darkorange" onClick={()=> {props.history.push('/connect')}}>NOVO</Button>
            </ul>
          </div>
      }
    </Container>
  )
}
