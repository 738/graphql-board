import React from 'react';
import { Table } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useHistory } from 'react-router';

const boardListQuery = gql`
    query {
        list {
            id
            title
            author
        }
    }
`;

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Author',
        dataIndex: 'author',
        key: 'author',
    },
];

const BoardListPage: React.FC = () => {
    const { loading, error, data } = useQuery(boardListQuery);
    let history = useHistory();
    if (loading) return <p>loading...</p>
    if (error) return <p>{error} error!</p>
    let dataSource = data.list;

    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            style={{width: 1000, cursor: 'pointer'}}
            onRow={(record: any, rowIndex) => {
                    console.log(record);
                    return {
                    onClick: event => { history.push(`/board/${record['id']}`)},
                }}
            }
        />
    )
}

export default BoardListPage;
