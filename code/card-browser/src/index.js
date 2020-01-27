import React from 'react';
import ReactDOM from 'react-dom';
import CardViewer from './CardViewer.js';
import Printable from './Printable.js';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import { Switch, Route } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={CardViewer} />
      <Route path='/card/:cardName' component={Printable}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
);

serviceWorker.unregister();
