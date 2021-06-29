import React, {useCallback, useEffect, useState} from "react";
import PropTypes from 'prop-types'
import {Button, Input} from 'antd';
import Link from 'next/link'
import {useSelector} from "react-redux";
import {UPDATE_POST_REQUEST} from "../reducers/post";

const { TextArea } = Input;
const PostCardContent = ({ postData, editMode, onChangePost, onCancelUpdate }) => {
    const { updatePostLoading, updatePostDone } = useSelector((state) => state.post)
    const [editText, setEditText] = useState(postData);

    useEffect(() => {
        if(updatePostDone) {
            onCancelUpdate();
        }
    }, [updatePostDone]);

    const onChangeText = useCallback((e) => {
        setEditText(e.target.value);
    });

    return (
        <div>
            {editMode
                ? (
                    <>
                        <TextArea value={editText} onChange={onChangeText}/>
                        <Button.Group>
                            <Button loading={updatePostLoading} onClick={onChangePost(editText)}>수정</Button>
                            <Button type="danger" onClick={onCancelUpdate}>취소</Button>
                        </Button.Group>
                    </>
                )
                : postData.split(/(#[^\s#]+)/g).map((v, i) => {
                    if(v.match(/(#[^\s#]+)/g)){
                        return <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={i}><a>{v}</a></Link>
                    }
                    return v;
                })}
        </div>
    )
}

PostCardContent.propTypes = {
    postData: PropTypes.string.isRequired,
    editMode: PropTypes.bool,
    onChangePost: PropTypes.func.isRequired,
    onCancelUpdate: PropTypes.func.isRequired
};

PostCardContent.defaultProps = {
    editMode: false,
}

export default PostCardContent