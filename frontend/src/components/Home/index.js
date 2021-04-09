import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import InitialPage from '../InitialPage';
import Login from '../Login';

export default function Home() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={InitialPage}/>
          <Route path='/login' component={Login}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}
