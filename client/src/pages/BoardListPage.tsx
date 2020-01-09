import React, { useEffect } from "react";
import { Table, Button } from "antd";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from "react-router";

export const boardListQuery = gql`
  query GetList {
    list {
      id
      title
      author
    }
  }
`;

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title"
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author"
  }
];

const BoardListPage: React.FC = () => {
  const { loading, error, data } = useQuery(boardListQuery, {
    fetchPolicy: 'cache-and-network'
  });
  let history = useHistory();
  
  if (loading) return <p>loading...</p>;
  if (error) return <p>{error} error!</p>;

  let dataSource = data.list;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Table
        dataSource={dataSource.sort((a: any, b: any) => b.id - a.id)}
        columns={columns}
        rowKey={(record: any) => record['id']}
        style={{ width: 1000, cursor: "pointer" }}
        onRow={(record: any, rowIndex) => {
          return {
            onClick: event => {
              history.push(`/board/${record["id"]}`);
            }
          };
        }}
      />
      <Button
        type="primary"
        style={{ width: 80 }}
        onClick={() => {
          history.push(`/write`);
        }}
      >
        글 작성
      </Button>
    </div>
  );
};

export default BoardListPage;
