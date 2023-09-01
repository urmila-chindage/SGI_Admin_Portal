import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
// React Notification
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';


ReactDOM.render((
  <BrowserRouter> 
   <NotificationContainer/>
    <App />
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
