import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Divider, Button, Modal, Comment } from "antd";
import { boardsQuery } from "./BoardListPage";
import CommentEditor from "../components/CommentEditor";

const readBoardQuery = gql`
  query Board($id: ID!) {
    board(id: $id) {
      id
      title
      contents
      author
      comments {
        id
        author
        contents
      }
    }
  }
`;

const deleteBoardMutation = gql`
  mutation DeleteBoard($id: ID!) {
    deleteBoard(id: $id) {
      id
    }
  }
`;

const createCommentMutation = gql`
  mutation CreateComment($boardId: ID!, $author: String!, $contents: String!) {
    createComment(
      input: { boardId: $boardId, author: $author, contents: $contents }
    ) {
      id
    }
  }
`;

const BoardDetailPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const [deleteConfirmModalVisible, setDeleteConfirmModalVisible] = useState(
    false
  );
  const [commentValue, setCommentValue] = useState("");
  const { loading, data } = useQuery(readBoardQuery, {
    variables: { id }
  });
  const [deleteBoard] = useMutation(deleteBoardMutation, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: boardsQuery
      }
    ]
  });
  const [createComment, { loading: createCommentLoading }] = useMutation(
    createCommentMutation,
    {
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: readBoardQuery,
          variables: { id }
        }
      ]
    }
  );
  const onDeleteCompleted = () => {
    setDeleteConfirmModalVisible(false);
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
        <h1>{data.board.title}</h1>
        <h3>{data.board.author}</h3>
        <Divider />
        {
          data.board.contents.split('\n').map((line: string) => <div style={{fontSize: 20}}>{line}</div>)
        }
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignSelf: "flex-end",
          marginBottom: 20
        }}
      >
        <Button
          type="primary"
          style={{ width: 80, marginTop: 20, marginRight: 20 }}
          onClick={() => {
            history.push(`/edit/${id}`);
          }}
        >
          글 편집
        </Button>
        <Button
          type="danger"
          style={{ width: 80, marginTop: 20 }}
          onClick={() => setDeleteConfirmModalVisible(true)}
        >
          글 삭제
        </Button>
      </div>
      <CommentEditor
        onChange={(event: any) => {
          setCommentValue(event.target.value);
        }}
        onSubmit={() => {
          createComment({
            variables: {
              boardId: id,
              author: "USER",
              contents: commentValue
            }
          }).then(_ => setCommentValue(""));
          
        }}
        submitting={createCommentLoading}
        value={commentValue}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {data.board.comments
          .sort((a: any, b: any) => b.id - a.id)
          .map((comment: any) => {
            return (
              <Comment
                author={<a>{comment.author}</a>}
                content={<p>{comment.contents}</p>}
                key={comment.id}
              />
            );
          })}
      </div>
      <Modal
        title="알림"
        visible={deleteConfirmModalVisible}
        onOk={onDeleteCompleted}
        onCancel={() => setDeleteConfirmModalVisible(false)}
      >
        <p>정말 삭제하시겠습니까?</p>
      </Modal>
    </div>
  );
};

export default BoardDetailPage;
