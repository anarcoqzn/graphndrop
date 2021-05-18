import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalStyle from './styles/global';

import Home from "./components/Home";
import InitialPage from './components/InitialPage';
import ConnectBD from './components/ConnectBD';
import EditBD from './components/EditBD';

function App() {
  return (
    <div>
      <GlobalStyle/>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={InitialPage}/>
          <Route path='/home' component={Home} />
          <Route path='/connect' component={ConnectBD} />
          <Route path='/edit/:id' component={EditBD} />
        </Switch>
      </BrowserRouter>
    </div>
  );
  }

  export default App;