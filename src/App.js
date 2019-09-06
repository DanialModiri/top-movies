import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom'
import Layout from './components/Layout';
import routes from './routes'

function App() {
  return (
    <HashRouter>
      <Switch>
        {routes.map(route => <Route render={(props) => <Layout 
        breadcrumb={(route.breadcrumb && route.breadcrumb()) || []}>
          <route.component {...props} />
        </Layout>} />)}
      </Switch>
    </HashRouter>

  );
}

export default App;
