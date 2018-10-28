import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Search from './Pages/Search';
import Detail from './Pages/Detail';
import NotFound from './Pages/NotFound';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/search/:text" component={Search} />
      <Route path="/weather/:woeid" component={Detail} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
