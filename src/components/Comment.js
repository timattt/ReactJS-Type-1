import styles from '../styles/Comment.module.scss'
import {connect} from "react-redux";
import {deleteComment, editComment, likeComment, unlikeComment} from "../store/actions/commentsActions";
import classNames from "classnames/bind";
import React, {useState} from "react";

function ViewContent(props) {
    return <div>{props.text}</div>
}

const EditContent = connect(
    (state) => {
        return {}
    },
    (dispatch) => {
        return {
            editComment: (commentId, text) => dispatch(editComment(commentId, text))
        }
    }
)((props) => {
    const [text, setText] = useState(props.text)

    return <div>
        <form onSubmit={(event) => {
            event.preventDefault();
            props.editComment(props.commentId, text)
        }}>
            <textarea value={text} onChange={(event) => {setText(event.target.value)}}/>
            <input type="submit" value="Send"/>
        </form>
    </div>
});

function Comment(props) {
    const {author, text, commentId, likesCount, liked, creationTime} = props.data
    const [edit, setEdit] = useState(false)

    const cx = classNames.bind(styles)

    const creationDate = new Date(creationTime)

    return <div className={cx(styles.Comment, {liked: liked})}>
        <div className="authorTab">{creationDate.getHours() + ':' + creationDate.getMinutes() + ':' + creationDate.getSeconds() + ' : ' + author}:</div>

        {edit ? <EditContent commentId={commentId} text={text} /> : <ViewContent text={text}/>}

        <div>
            Likes: {likesCount}
            <button className="likeComment" onClick={() => {
                if (liked) {
                    props.unlikeComment(commentId)
                } else {
                    props.likeComment(commentId)
                }
            }}>Like</button>
            <button className="editComment" onClick={() => {setEdit(!edit)}}>Edit</button>
            <button className="deleteComment" onClick={() => props.deleteComment(commentId)} >X</button>
        </div>
    </div>
}

export default connect(
    (state) => {
        return {}
    },
    (dispatch) => {
        return {
            deleteComment: (commentId) => dispatch(deleteComment(commentId)),
            likeComment: (commentId) => dispatch(likeComment(commentId)),
            unlikeComment: (commentId) => dispatch(unlikeComment(commentId))
        }
    }
)(Comment);