import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Input } from '../Input';
import { Container } from './styles';
import { Button } from '../Button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { editConnection, setConnection } from '../../services/actions/userActions';
import { Error, Loading } from '../Loading&Error';

export default function EditBD(props) {
  const selectedConnection = Cookies.getJSON('selectedConnection');
  const [dbName, setDBName] = useState(selectedConnection.dbName || '');
  const [dbUser, setDBUser] = useState(selectedConnection.user || '');
  const [dbUserPassword, setDBUserPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { loading, error } = useSelector(state => state.editedConnection);

  const [viewPasswd, setViewPasswd] = useState(false);
  const [viewNewPasswd, setViewNewPasswd] = useState(false);
    
  const dispatch = useDispatch();

  const handleDBName = (input) => {
    const data = input.target.value;
    setDBName(data);
  }

  const handleDBUser = (input) => {
    const data = input.target.value;
    setDBUser(data);
  }

  const handleDBUserPassword = (input) => {
    const data = input.target.value;
    setDBUserPassword(data);
  }

  const handleNewPassword = (input) => {
    const data = input.target.value;
    setNewPassword(data);
  }

  const submitEditConn = () => {
    if (dbUserPassword === selectedConnection.password) {
      const data = {
        'id': selectedConnection.id,
        'dbName': dbName,
        'dbUser': dbUser
      }

      if (newPassword.trim().length > 0) data.dbUserPassword = newPassword;

      dispatch(editConnection(selectedConnection.id, data)).then(() => {
        dispatch(setConnection(editConnection)).then(() => {
          props.history.push("/");
        })
      });
    } else {
      alert("Type user's current password!")
    }
  }

  const handleViewPasswd = () => {
    const inputPasswd = document.getElementById("db-user-password");
    if (!viewPasswd) {
      inputPasswd.type = 'text';
      setViewPasswd(true);
    }
    else {
      inputPasswd.type = "password";
      setViewPasswd(false);
    }
  }

  const handleViewNewPasswd = () => {
    const inputPasswd = document.getElementById("new-password");
    if (!viewNewPasswd) {
      inputPasswd.type = 'text';
      setViewNewPasswd(true);
    }
    else {
      inputPasswd.type = "password";
      setViewNewPasswd(false);
    }
  }
  
  return (
    loading ? <Loading msg={"Loading..."} /> :
    error ? <Error msg={`Error at updating your connection.  ERROR:${error.data.errorNum} STATUS:${error.status}`} /> :
    <Container>
      <h1>Edit connection {selectedConnection.dbName}</h1>
      
      <label className="gridCol0">Connect String: </label>
      <Input id='db-name' className="gridCol1" type='text' value={dbName} onChange={handleDBName}/>
      
      <label className="gridCol0">User:</label>
      <Input id='db-user' className="gridCol1" type='text' value={dbUser} onChange={handleDBUser} />
      
      <label className="gridCol0">Current Password:</label>
      <Input id='db-user-password' wrong={dbUserPassword.length > 0 &&  dbUserPassword !== selectedConnection.password} className="gridCol1" type='password' value={dbUserPassword} onChange={handleDBUserPassword} placeholder='PASSWORD' />
      {!viewPasswd ? 
        <FaEye className="gridCol1" onClick={handleViewPasswd}/> :
        <FaEyeSlash className="gridCol1" onClick={handleViewPasswd} />
      }

      <label className="gridCol0">New Password:</label>
      <Input id='new-password' className="gridCol1" type='password' value={newPassword} onChange={handleNewPassword} placeholder='PASSWORD' />
      {!viewNewPasswd ? 
        <FaEye className="gridCol1" onClick={handleViewNewPasswd}/> :
        <FaEyeSlash className="gridCol1" onClick={handleViewNewPasswd} />
      }
      
      <Button color="lightgreen" onClick={submitEditConn}>SAVE</Button>
    </Container>
  )
}
