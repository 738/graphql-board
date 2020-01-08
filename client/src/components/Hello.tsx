import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const HELLO_QUERY = gql`
  query {
    list {
      id
      title
      contents
      author
    }
  }
`;

const Hello: React.FC = () => {
  const { loading, error, data } = useQuery(HELLO_QUERY);
  if (loading) return <p>loading...</p>;
  if (error) return <p>{error} is occurred</p>;
  return <div>{data.list[0].title}</div>;
};

export default Hello;
