import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { Divider, Input, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const boardWriteMutation = gql`
    mutation CreateBoard($title: String!, $contents: String!, $author: String!) {
        createBoard(input: {
            title: $title,
            contents: $contents,
            author: $author,
        }) {
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
    const [createBoard, { data }] = useMutation(boardWriteMutation);
    const onComplete = async () => {
        await createBoard({
            variables: {
                title,
                author,
                contents
            }
        })
        history.push('/');
    }
    return (
        <div style={{ width: '60%', border: '0.5px solid black', padding: '80px 40px', borderRadius: 8 }}>
            <Input placeholder="제목" style={{marginBottom: 12}} value={title} onChange={(e) => setTitle(e.target.value)}/>
            <Input placeholder="작성자" value={author} onChange={(e) => setAuthor(e.target.value)}/>
            <Divider />
            <TextArea placeholder="내용" rows={4} value={contents} onChange={(e) => setContents(e.target.value)} />
            <Button type="primary" style={{float: 'right', marginTop: 12}} onClick={onComplete}>작성완료</Button>
        </div>
    );
}

export default BoardWritePage;
