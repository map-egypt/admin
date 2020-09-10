'use strict';
var config = require('./config');

import React from 'react';
import { PropTypes as T } from 'prop-types';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Index from './components/Index';
import Header from './components/Header';
import Login from './components/Login';
import ProjectList from './components/ProjectList';
import NewProject from './components/NewProject';
import Project from './components/Project';
import EditProject from './components/EditProject';
import IndicatorList from './components/IndicatorList';
import NewIndicator from './components/NewIndicator';
import Indicator from './components/Indicator';
import EditIndicator from './components/EditIndicator';
import AuthService from './utils/AuthService';

const auth = new AuthService(config.auth0_token, config.auth0_namespace);

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' });
  }
};
// create function to check type of editor
const checkInterEditor = (nextState, replace) => {
  if (!(auth.isInternationalEditor() || auth.isAdmin())) {
    replace({ pathname: '/' });
  }
};
const checknationalEditor = (nextState, replace) => {
  if (!(auth.isNationalEditor() || auth.isAdmin())) {
    replace({ pathname: '/' });
  }
};
const checkIndicatorsEditor = (nextState, replace) => {
  if (!(auth.isIndicatorEditor() || auth.isAdmin())) {
    replace({ pathname: '/' });
  }
};
const parseAuthHash = (nextState, replace, callback) => {
  auth.parseHash(`access_token=${nextState.params.access_token}`, replace, callback);
};

const alreadyAuth = (nextState, replace) => {
  if (auth.loggedIn()) {
    replace({ pathname: '/' });
  }
};

class App extends React.Component {
  static contextTypes = {
    router: T.object
  }

  constructor (props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  componentWillMount () {
    this.setState({
      auth: auth
    });
  }

  logout () {
    this.state.auth.logout();
    this.context.router.push('/login');
  }

  render () {
    const component = this;
    let children = null;
    if (component.props.children) {
      children = React.cloneElement(component.props.children, {
        auth: component.props.route.auth
      });
    }
    return (
      <div>
      {(component.props.route.auth.loggedIn()
        ? <Header logout={component.logout} auth={component.props.route.auth}/>
        : ''
      )}
        {children}
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} auth={auth}>
      <IndexRoute component={Index} onEnter={requireAuth} />
      <Route path="projects/international" component={() => <ProjectList auth={auth} type={'international'}/>} onEnter={checkInterEditor} />
      <Route path="projects/national" component={() => <ProjectList auth={auth} type={'national'}/>} onEnter={checknationalEditor} />
      <Route path="projects/:type(national|international)/new" component={NewProject} onEnter={requireAuth} />
      <Route path="projects/:id" component={Project} onEnter={requireAuth} />
      <Route path="projects/:id/edit" component={EditProject} onEnter={requireAuth} />
      <Route path="indicators" component={IndicatorList} onEnter={checkIndicatorsEditor} />
      <Route path="indicators/new" component={NewIndicator} onEnter={checkIndicatorsEditor} />
      <Route path="indicators/:id" component={Indicator} onEnter={checkIndicatorsEditor} />
      <Route path="indicators/:id/edit" component={EditIndicator} onEnter={checkIndicatorsEditor} />
      <Route path="login" component={Login} onEnter={alreadyAuth} />
      <Route path="access_token=:access_token" onEnter={parseAuthHash} />
    </Route>
  </Router>,
  document.querySelector('#site-canvas')
);
