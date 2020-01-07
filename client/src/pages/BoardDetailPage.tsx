import React from 'react';
import { gql } from 'apollo-boost';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Divider } from 'antd';

const boardDetailQuery = gql`
    query Detail($id: ID!){
        detail(id: $id) {
            id
            title
            contents
            author
        }
    }
`;

const BoardDetailPage = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(boardDetailQuery, { variables: { id }});
    if (loading) return <p>loading...</p>
    return (
        <div style={{ width: '60%', border: '0.5px solid black', padding: '80px 40px', borderRadius: 8 }}>
            <h1>{data.detail.title}</h1>
            <h3>{data.detail.author}</h3>
            <Divider />
            <p style={{ paddingTop: 20, fontSize: 20 }}>{data.detail.contents}</p>
        </div>
    );
}

export default BoardDetailPage;
