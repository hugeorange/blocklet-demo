import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import './app.css';
import Home from './pages/home';
import About from './pages/about';
import BtcBlock from './pages/btc-block/index';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/home" component={Home} />
        <Route path="/btc-block" component={BtcBlock} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

const WrappedApp = withRouter(App);

export default () => {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      <WrappedApp />
    </Router>
  );
};
