import React from "react";
import { gql } from "apollo-boost";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Divider, Button } from "antd";
import { boardListQuery } from "./BoardListPage";

const boardDetailQuery = gql`
  query Detail($id: ID!) {
    detail(id: $id) {
      id
      title
      contents
      author
    }
  }
`;

const boardDeleteMutation = gql`
  mutation DeleteBoard($id: ID!) {
    deleteBoard(id: $id) {
      id
      title
      contents
      author
    }
  }
`;

const BoardDetailPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const { loading, data } = useQuery(boardDetailQuery, {
    variables: { id }
  });
  const [deleteBoard] = useMutation(boardDeleteMutation, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: boardListQuery
      }
    ]
  });
  const onDeleteCompleted = () => {
    deleteBoard({
      variables: {
        id
      }
    }).then(_ => history.push("/"));
  };
  if (loading) return <p>loading...</p>;
  return (
    <div style={{ width: "60%", display: "flex", flexDirection: "column" }}>
      <Button
        style={{ width: 80, marginBottom: 20 }}
        onClick={() => history.push("/")}
      >
        목록으로
      </Button>
      <div
        style={{
          border: "0.5px solid black",
          padding: "80px 40px",
          borderRadius: 8
        }}
      >
        <h1>{data.detail.title}</h1>
        <h3>{data.detail.author}</h3>
        <Divider />
        <p style={{ paddingTop: 20, fontSize: 20 }}>{data.detail.contents}</p>
      </div>
      <Button
        type="primary"
        style={{ width: 80, marginTop: 20 }}
        onClick={() => {
          history.push(`/edit/${id}`);
        }}
      >
        글 편집
      </Button>
      <Button
        type="danger"
        style={{ width: 80, marginTop: 20 }}
        onClick={onDeleteCompleted}
      >
        글 삭제
      </Button>
    </div>
  );
};

export default BoardDetailPage;
