import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalStyle from './styles/global';

import Home from "./components/Home";
import InitialPage from './components/InitialPage';
import Login from './components/Login';

function App() {
  return (
    <div>
      <GlobalStyle/>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={InitialPage}/>
          <Route path='/login' component={Login} />
          <Route path='/home' componen={Home}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
  }

  export default App;