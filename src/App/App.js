/* eslint react/no-did-mount-set-state: 0 */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { save } from 'redux-localstorage-simple';

import './App.css';

import rootReducer from '../Redux/reducers/rootReducer';

import { Account } from '../Authorization/Accounts/Accounts'
import ProtectedRoute from '../Authorization/ProtectedRoute/ProtectedRoute'
import SignUp from '../Authorization/SignUp/SignUp'
import GalleriesList from '../Components/Galleries/GalleriesList'
import Login from '../Authorization/Login/Login'
import Logout from '../Authorization/Logout/Logout'
import ForgotPassword from '../Authorization/ForgotPassword/ForgotPassword'

import GalleryPage from '../Components/Galleries/GalleryPage'
import MenuBar from '../Components/MenuBar/MenuBar'
import Filter from '../Components/Filter'


const middleware = [thunk];


const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware, save())),
);



function App(){
 return(
    <Provider store={store}>
      <Account>
        <Router>
          <div className="App">
            <header className="App-header">
              <MenuBar />
              <Filter/>
            </header>
            <Switch>
              <Route exact path='/register' component={SignUp} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/logout' component={Logout} />
              <Route exact path='/forgot' component={ForgotPassword} />
              <ProtectedRoute exact path='/' component={GalleriesList} />
              <ProtectedRoute path="/:id" component={GalleryPage} /> 
            </Switch>
          </div>
        </Router>
      </Account>
    </Provider>
  )
};

export default (App)






