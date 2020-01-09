import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { Divider, Input, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { boardListQuery } from "./BoardListPage";

const boardWriteMutation = gql`
  mutation CreateBoard($title: String!, $contents: String!, $author: String!) {
    createBoard(
      input: { title: $title, contents: $contents, author: $author }
    ) {
      id
      title
      author
    }
  }
`;

const BoardWritePage = () => {
  let [title, setTitle] = useState("");
  let [author, setAuthor] = useState("");
  let [contents, setContents] = useState("");
  let history = useHistory();
  const [createBoard] = useMutation(boardWriteMutation);

  const onComplete = () => {
    createBoard({
      variables: {
        title,
        author,
        contents
      }
    }).then(({ data }) => {
      history.push(`/board/${data.createBoard.id}`);
    });
  };
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
        {/* {loading && <div>loading...</div>} */}
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
          onClick={onComplete}
        >
          작성완료
        </Button>
      </div>
    </div>
  );
};

export default BoardWritePage;
