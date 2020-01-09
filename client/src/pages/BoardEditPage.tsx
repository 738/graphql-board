import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Divider, Input, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";

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

const boardEditMutation = gql`
  mutation EditBoard(
    $id: ID!,
    $title: String!,
    $contents: String!,
    $author: String!,
  ) {
    editBoard(
      id: $id,
      input: { title: $title, contents: $contents, author: $author }
    ) {
      id
      title
      contents
      author
    }
  }
`;

const BoardEditPage = () => {
  let [title, setTitle] = useState("");
  let [author, setAuthor] = useState("");
  let [contents, setContents] = useState("");
  let history = useHistory();
  let { id } = useParams();
  const { loading: detailLoading, data: detailData } = useQuery(boardDetailQuery, {
    variables: { id }
  });

  const [editBoard, { loading, error, data }] = useMutation(boardEditMutation);
  useEffect(() => {
    if (detailData) {
      setTitle(detailData.detail.title);
      setAuthor(detailData.detail.author);
      setContents(detailData.detail.contents);
    }
  }, [detailData]);

  const onEditCompleted = () => {
    editBoard({
      variables: {
        id,
        title,
        author,
        contents
      }
    }).then(_ => history.push(`/board/${id}`));
  };

  if (detailLoading) return <div>loading...</div>;

  return (
    <div
      style={{
        width: "60%",
        border: "0.5px solid black",
        padding: "80px 40px",
        borderRadius: 8
      }}
    >
      {loading && <div>loading...</div>}
      <Input
        placeholder="제목"
        style={{ marginBottom: 12 }}
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Input
        placeholder="작성자"
        value={author}
        onChange={e => setAuthor(e.target.value)}
        disabled
      />
      <Divider />
      <TextArea
        placeholder="내용"
        rows={4}
        value={contents}
        onChange={e => setContents(e.target.value)}
      />
      <Button
        type="primary"
        style={{ float: "right", marginTop: 12 }}
        onClick={onEditCompleted}
      >
        편집완료
      </Button>
    </div>
  );
};

export default BoardEditPage;
