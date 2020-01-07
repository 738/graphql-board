import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './apollo/client';
import Hello from './components/Hello';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Hello />
    </ApolloProvider>
  );
}

export default App;
