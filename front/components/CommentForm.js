import {Button, Form, Input} from "antd";
import {useCallback, useEffect} from "react";
import useInput from "../hooks/useInput";
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import {ADD_COMMENT_REQUEST} from "../reducers/post";

const CommentForm = ({post}) => {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.user.me?.id);
    const {addCommentDone, addCommentLoading} = useSelector((state) => state.post);
    const [commentText, onChangeCommentText, setCommentText] = useInput('');

    useEffect(() => {
        if (addCommentDone) {
            setCommentText('');
        }
    }, [addCommentDone])

    const onSubmitComment = useCallback(() => {
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {content: commentText, postId: post.id, userId: id},
        });
    }, [commentText, id]);

    return (
        <Form onFinish={onSubmitComment}>
            <Form.Item style={{position: 'relative', margin: 0}}>
                <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
                <Button style={{position: 'absolute', right: 0, bottom: -40, zIndex: 1}}
                        type="primary" htmlType="submit" loading={addCommentLoading}>삐약</Button>
            </Form.Item>
        </Form>
    );
};

CommentForm.propTypes = {
    post: PropTypes.object.isRequired
}

export default CommentForm;