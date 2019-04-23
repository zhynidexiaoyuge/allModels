import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import './assets/css/iconfont.css';
import App from './App';
import Login from './page/login';
import {HashRouter, Route, Switch} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<HashRouter>
  <Switch>
    <Route path='/login' exact component={Login} />
    <Route path='/' component={App} />
  </Switch>
</HashRouter>,
  document.getElementById('root'));
registerServiceWorker();
