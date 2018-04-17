import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { Hero, HeroBody, HeroFooter } from 'bloomer';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';

import './node_modules/bulma/bulma.sass';
import Menu from './components/tabs';
import TodoApp from './redux/reducers';
import { GraphQLAddSingle, GraphQLAddExtended, GraphQLEdit, GraphQLTable, CategoryTable, GraphQLSingleCard } from './components/hoc';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
});

const store = Redux.createStore(TodoApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <ApolloProvider client={client}>
    <ReactRedux.Provider store={store}>
      <BrowserRouter>
        <div>
          <Hero isColor="info">
            <GraphQLAddExtended />
            <GraphQLEdit />
            <HeroBody>
              <GraphQLAddSingle />
            </HeroBody>
            <HeroFooter>
              <Route component={Menu} />
            </HeroFooter>
          </Hero>
          <Route exact path="/" component={GraphQLTable} />
          <Route exact path="/category" component={CategoryTable} />
          <Route exact path="/task/:id" component={GraphQLSingleCard} />
        </div>
      </BrowserRouter>
    </ReactRedux.Provider>
  </ApolloProvider>,
  document.getElementById('example'),
);
