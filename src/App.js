import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/Home'
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { createUploadLink } from 'apollo-upload-client';
// import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Api from './components/Api'
import Details from './components/Details'

const link = createUploadLink({ uri: 'https://newgqldb.herokuapp.com/v1alpha1' });

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
      <Router>
						<Switch>
							<Route exact path='/' component={Home} />
							<Route path='/mail' component={Api} />
              <Route path='/details' component={Details} />
						</Switch>
				</Router>    
  </ApolloProvider>
);

export default App;
