import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Input } from '../Input';
import { Button } from '../Button';
import { NewConnection } from './styles';

import { useDispatch } from 'react-redux';
import { newConnection } from '../../services/actions/userActions';

export default function ConnectBD(props) {
  const [dbName, setDBName] = useState('');
  const [dbUser, setDBUser] = useState('');
  const [dbUserPassword, setDBUserPassword] = useState('');
  const [instCliPath, setInstCliPath] = useState('');

  const btnDisabled = dbName.trim().length === 0 || dbUser.trim().length === 0 ||
                       dbUserPassword.trim().length === 0 || instCliPath.trim().length === 0;

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

  const handleInstCliPath = (input) => {
    const data = input.target.value;
    if (data !== '' && data.length > 0) {
      setInstCliPath(data);
    }
  }

  const submitConn = async () => {
    const data = {
      dbName:dbName,
      dbUser: dbUser,
      dbUserPassword: dbUserPassword,
      walletPath:instCliPath
    }

    await dispatch(newConnection( data ));
    props.history.push('/home');
  }

  return (
    <NewConnection>
      <h1>Create a new connection</h1>

      <div className="inputs">
        <Input id='db-name' type='text' value={dbName} onChange={handleDBName} placeholder='DATABASE NAME' />
        <Input id='db-user' type='text' value={dbUser} onChange={handleDBUser} placeholder='USER' />
        <Input id='db-user-password' type='password' value={dbUserPassword} onChange={handleDBUserPassword} placeholder='PASSWORD' />
        <Input id="instant-client-path" type="text" value={instCliPath} onChange={handleInstCliPath} placeholder="Paste here the Oracle Instant Client folder path." />

        <Button disabled={ btnDisabled } color="darkorange" onClick={submitConn}>CONNECT</Button>
      </div>

      <div className="instructions">
        <h1>Is it your first connection? Follow these steps.</h1>
      
        <p>From the <b>Oracle Cloud Console</b>, go to the <b>Autnomous Database Details</b> page of your Oracle Autonomous Database instance.</p>
        <p>Click the <b>DB Connection</b> button.</p>
        <p>A new window will appear. Click the <b>Download Wallet</b> button.</p>
        <p>Save the credentials zip file to secure location.</p>
        <p>Download Oracle  Instant Client <Link to="https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html">(64-bits)</Link> or <Link to="https://www.oracle.com/database/technologies/instant-client/microsoft-windows-32-downloads.html">(32-bits)</Link> zip folder.</p>
        <p>Extract the libraries to an accessible directory, for example the libraries could be in C:\oracle\instantclient_19_9</p>
        <p>Create network\admin sub-directories at the instantclient_19_9 folder. So, in our example it should be <b>C:\oracle\instantclient_19_9\network\admin.</b></p>
        <p>Unzip the previously obtained credentials zip file and move the extracted folder to the new <b>network\admin</b> sub-directory. The directory hierarchy should look like <b>C:\oracle\instantclient_19_9\network\admin\MY_WALLET</b></p>
        <p>Copy and paste the tsnames.ora file from MY_WALLET folder to \network\admin.</p>
        <p>Open the tsnames.ora file and for each network alias (connection string) you use, you have to add/embed following parameters:</p>
          
        <pre><strong>(MY_WALLET_DIRECTORY</strong>=C:\oracle\instantclient_19_9\network\admin\MY_WALLET)(SSL_VERSION=1.2)(SSL_SERVER_DN_MATCH=yes)</pre>
    
        <strong>For Example:</strong>
        <pre>my_db = (description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.sa-saopaulo-1.oraclecloud.com))(connect_data=(service_name=ojsrz2onpjhivsh_my_db.adb.oraclecloud.com))(security=(ssl_server_cert_dn="CN=adb.sa-saopaulo-1.oraclecloud.com,OU=Oracle ADB SAOPAULO,O=Oracle Corporation,L=Redwood City,ST=California,C=US")<strong>(MY_WALLET_DIRECTORY=C:\oracle\instantclient_19_10\network\admin\MY_WALLET)(SSL_VERSION=1.2)(SSL_SERVER_DN_MATCH=yes)</strong>))
        </pre>
      </div>
    </NewConnection>
  )
}
