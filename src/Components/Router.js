import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
