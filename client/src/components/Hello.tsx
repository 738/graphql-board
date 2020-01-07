import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const HELLO_QUERY = gql`
  {
    hello(name: "junwood")
  }
`;

const Hello: React.FC = () => {
    const { loading, error, data } = useQuery(HELLO_QUERY);
    if (loading) return <p>loading...</p>
    if (error) return <p>{error} is occurred</p>
    console.log(data);
    return (
      <div>
          {data.hello}
      </div>
    )
}

export default Hello;