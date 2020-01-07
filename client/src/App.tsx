import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './apollo/client';
import BoardListPage from './pages/BoardListPage';
import BoardDetailPage from './pages/BoardDetailPage';
import BoardWritePage from './pages/BoardWritePage';
import 'antd/dist/antd.css';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div style={{marginTop: 120, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Route exact path='/' component={BoardListPage} />
          <Route path='/board/:id' component={BoardDetailPage} />
          <Route path='/write' component={BoardWritePage} />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
