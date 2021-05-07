import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Input } from '../Input';
import { Button } from '../Button';
import { InstructionsContainer, InstructionsContent, NewConnection } from './styles';

import { useDispatch } from 'react-redux';
import { newConnection } from '../../services/actions/userActions';

export default function ConnectBD(props) {
  const [dbName, setDBName] = useState('');
  const [dbUser, setDBUser] = useState('');
  const [dbUserPassword, setDBUserPassword] = useState('');
  const [connectString, setConnectString] = useState('');
  const [heightOne, setHeightOne] = useState('0');
  const [heightTwo, setHeightTwo] = useState('0');
  

  const btnDisabled = dbName.trim().length === 0 || dbUser.trim().length === 0 ||
                      dbUserPassword.trim().length === 0; //|| connectString.trim().length === 0;

  const dispatch = useDispatch();

  const handleDBName = (input) => {
    const data = input.target.value;
    if (data !== '' && data.length > 0) {
      setDBName(data);
    }
  }

  const handleDBUser = (input) => {
    const data = input.target.value;
    if (data !== '' && data.length > 0) {
      setDBUser(data);
    }
  }

  const handleDBUserPassword = (input) => {
    const data = input.target.value;
    if (data !== '' && data.length > 0) {
      setDBUserPassword(data);
    }
  }

  const handleConnectString = (input) => {
    const data = input.target.value;
    if (data !== '' && data.length > 0) {
      setConnectString(data);
    }
  }

  const submitConn = async () => {
    const data = {
      dbName:dbName,
      dbUser: dbUser,
      dbUserPassword: dbUserPassword,
      connectString:connectString
    }

    await dispatch(newConnection( data ));
    props.history.push('/');
  }

  function handleCollapse(value) {
    if (value === 0) {
      if (heightOne === '0') setHeightOne('fit-content');
      else setHeightOne('0');
    } else if (value === 1) {
      if (heightTwo === '0') setHeightTwo('fit-content');
      else setHeightTwo('0');
    }
  }

  return (
    <NewConnection>
      <h1>Create a new connection</h1>

      <div className="inputs">
        <Input id='db-name' type='text' value={dbName} onChange={handleDBName} placeholder='Connect String Variable (Ex: my_db_high)' />
        <Input id='db-user' type='text' value={dbUser} onChange={handleDBUser} placeholder='USER' />
        <Input id='db-user-password' type='password' value={dbUserPassword} onChange={handleDBUserPassword} placeholder='PASSWORD' />
        {/* Check this in the future: It may be possible to connect using only a connectString directly */}
        {/* <Input id="instant-client-path" type="text" value={connectString} onChange={handleConnectString} placeholder="Connect String" /> */}

        <Button disabled={ btnDisabled } color="darkorange" onClick={submitConn}>CONNECT</Button>
      </div>
      <InstructionsContainer>
        <h1 onClick={()=>handleCollapse(0)}>Is it your first connection? Follow these steps.</h1>
        <InstructionsContent id="instructions1" maxHeight={heightOne}>
          <p>From the <b>Oracle Cloud Console</b>, go to the <b>Autnomous Database Details</b> page of your Oracle Autonomous Database instance.</p>
          <p>Click the <b>DB Connection</b> button.</p>
          <p>A new window will appear. Click the <b>Download Wallet</b> button.</p>
          <p>Save the credentials zip file to secure location.</p>
          <p>Download Oracle  Instant Client <Link to="https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html">(64-bits)</Link> or <Link to="https://www.oracle.com/database/technologies/instant-client/microsoft-windows-32-downloads.html">(32-bits)</Link> zip folder.</p>
          <p>Extract the libraries to C:\Oracle directory. Result should be: C:\Oracle\instantclient_19_9</p>
          <p>Create network\admin sub-directories at the instantclient_19_9 folder. So, it should be <b>C:\Oracle\instantclient_19_9\network\admin.</b></p>
          <p>Unzip the previously obtained credentials zip file and move the extracted folder to the new <b>network\admin</b> sub-directory. The directory hierarchy should look like <b>C:\Oracle\instantclient_19_9\network\admin\MY_WALLET</b></p>
          <p>Copy and paste the tsnames.ora file from MY_WALLET folder to \network\admin.</p>
          <p>Open the tsnames.ora file and for each network alias (connection string) you use, you have to add/embed following parameters:</p>
            
          <pre><strong>(MY_WALLET_DIRECTORY</strong>=C:\Oracle\instantclient_19_9\network\admin\MY_WALLET)(SSL_VERSION=1.2)(SSL_SERVER_DN_MATCH=yes)</pre>
      
          <strong>For Example:</strong>
          <pre>my_db = (description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.sa-saopaulo-1.oraclecloud.com))(connect_data=(service_name=ojsrz2onpjhivsh_my_db.adb.oraclecloud.com))(security=(ssl_server_cert_dn="CN=adb.sa-saopaulo-1.oraclecloud.com,OU=Oracle ADB SAOPAULO,O=Oracle Corporation,L=Redwood City,ST=California,C=US")<strong>(MY_WALLET_DIRECTORY=C:\Oracle\instantclient_19_10\network\admin\MY_WALLET)(SSL_VERSION=1.2)(SSL_SERVER_DN_MATCH=yes)</strong>))
          </pre>

          <p>The Connect String value is the variable name on tsnames.ora file for the connections. In the previous example, it shall be:</p> <pre>my_db</pre>
        </InstructionsContent>

        <h1 onClick={() => handleCollapse(1)}>Add another connection? Follow these steps.</h1>
        <InstructionsContent id="instructions2" maxHeight={heightTwo}>
          <p>From the <b>Oracle Cloud Console</b>, go to the <b>Autnomous Database Details</b> page of your Oracle Autonomous Database instance.</p>
          <p>Click the <b>DB Connection</b> button.</p>
          <p>A new window will appear. Click the <b>Download Wallet</b> button.</p>
          <p>Save the credentials zip file to secure location.</p>
          <p>Extract the credentials zip file and move the extracted folder to the new <b>network\admin</b> sub-directory in the C:\Oracle\instantclient_19_9\. The directory hierarchy should look like <b>C:\Oracle\instantclient_19_9\network\admin\MY_NEW_WALLET</b></p>
          <p>Open the <strong>MY_NEW_WALLET</strong> directory and open the tsnames.ora file.</p>
          <p>Copy the whole content of this file.</p>
          <p>Open the \network\admin\tsnames.ora file and paste the content at the end of this file.</p>
          <p>For each network alias (connection string) you use, you have to add/embed following parameters:</p>
          <pre><strong>(MY_WALLET_DIRECTORY</strong>=C:\Oracle\instantclient_19_9\network\admin\MY_WALLET)(SSL_VERSION=1.2)(SSL_SERVER_DN_MATCH=yes)</pre>
          <strong>For Example:</strong>
          <pre>my_db = (description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.sa-saopaulo-1.oraclecloud.com))(connect_data=(service_name=ojsrz2onpjhivsh_my_db.adb.oraclecloud.com))(security=(ssl_server_cert_dn="CN=adb.sa-saopaulo-1.oraclecloud.com,OU=Oracle ADB SAOPAULO,O=Oracle Corporation,L=Redwood City,ST=California,C=US")<strong>(MY_WALLET_DIRECTORY=C:\Oracle\instantclient_19_10\network\admin\MY_WALLET)(SSL_VERSION=1.2)(SSL_SERVER_DN_MATCH=yes)</strong>))
          </pre>

          <p>Now, you must have added a new set of Connection Strings to your tsnames.ora file. Use its variables to connect your database.</p>
        </InstructionsContent>
      </InstructionsContainer>
    </NewConnection>
  )
}
