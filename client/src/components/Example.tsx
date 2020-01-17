import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const EXAMPLE_QUERY = gql`
  query Boards {
    boards {
      id
      title
    }
  }
`;

const Example = () => {
  const { loading, error, data } = useQuery(EXAMPLE_QUERY);
  if (loading) return <p>loading...</p>;
  if (error) return <p>error: {error}</p>
  return (
    <ul>
      {data.boards.map((board: any) => (
        <li key={board.id}>{board.title}</li>
      ))}
    </ul>
  );
};

export default Example;
