import React from 'react';
import { gql } from 'apollo-boost';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Card } from 'antd';

const boardDetailQuery = (id?: string) => gql`
    query {
        detail(id: ${id}) {
            id
            title
            contents
            author
        }
    }
`;

const BoardDetailPage = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(boardDetailQuery(id));
    if (loading) return <p>loading...</p>
    return (
        <div>
            <Card title={data.detail.title} bordered={false} style={{ width: 300 }}>
                <p>{data.detail.contents}</p>
                <p>written by {data.detail.author}</p>
            </Card>
        </div>
    );
}

export default BoardDetailPage;
