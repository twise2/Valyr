import React from 'react';
import ReactDOM from 'react-dom';
import Viewer from './Viewer.js';
import Printable from './Printable.js';
import Conflict from './Conflict.js';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import { Switch, Route } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Conflict} />
      <Route path="/conflict" component={Conflict} />
      <Route path="/search/:params?" component={Viewer} />
      <Route path='/card/:cardName' component={Printable}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
);

serviceWorker.unregister();
