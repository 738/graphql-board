import React from 'react';
import { Form, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

interface CommentEditorProps {
    onChange: (event?: React.SyntheticEvent<HTMLElement>) => void;
    onSubmit: (event?: React.SyntheticEvent<HTMLElement>) => void;
    submitting: boolean;
    value: string;
}

const CommentEditor = ({ onChange, onSubmit, submitting, value }: CommentEditorProps) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        댓글 작성
      </Button>
    </Form.Item>
  </div>
);

export default CommentEditor;