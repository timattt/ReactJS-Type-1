import styles from '../styles/Comment.module.scss'
import {connect} from "react-redux";
import {deleteComment, editComment, likeComment, unlikeComment} from "../store/actions/commentsActions";
import classNames from "classnames/bind";
import React, {useReducer} from "react";

const commentActions = {
    CHANGE_TEXT: "TEXT",
    LIKE: "LIKE",
    EDIT_MODE: "EDIT"
}

function commentReducer(state={}, action) {
    switch (action.type) {
        default:
            return state
        case commentActions.LIKE:
            return {...state, liked: action.payload}
        case commentActions.CHANGE_TEXT:
            return {...state, text: action.payload}
        case commentActions.EDIT_MODE:
            return {...state, edit: action.payload}
    }
}

function ViewContent(props) {
    return <div>{props.text}</div>
}

const EditContent = connect(
    () => {
        return {}
    },
    (dispatch) => {
        return {
            editComment: (commentId, text) => dispatch(editComment(commentId, text))
        }
    }
)((props) => {
    return <div>
        <form onSubmit={(event) => {
            event.preventDefault();
            props.editComment(props.commentId, props.state.text)
            props.dispatch({type: commentActions.EDIT_MODE, payload: false})
        }}>
            <textarea value={props.state.text} onChange={(event) => {
                props.dispatch({type: commentActions.CHANGE_TEXT, payload: event.target.value})
            }}/>
            <input type="submit" value="Send"/>
        </form>
    </div>
});

function Comment(props) {
    const [state, dispatch] = useReducer(commentReducer, {
        text: props.data.text,
        edit: false,
        like: props.data.liked
    })

    const cx = classNames.bind(styles)

    const creationDate = new Date(props.data.creationTime)

    return <div className={cx(styles.Comment, {liked: state.liked})}>
        <div className="authorTab">{creationDate.getHours() + ':' + creationDate.getMinutes() + ':' + creationDate.getSeconds() + ' : ' + props.data.author}:</div>

        {
            state.edit ?
                <EditContent commentId={props.data.commentId} state={state} dispatch={dispatch}/> :
                <ViewContent text={state.text} state={state} dispatch={dispatch}/>
        }

        <div>
            Likes: {props.data.likesCount}
            <button className="likeComment" onClick={() => {
                if (state.liked) {
                    props.unlikeComment(props.data.commentId)
                } else {
                    props.likeComment(props.data.commentId)
                }
                dispatch({type: commentActions.LIKE, payload: !state.liked})
            }}>Like</button>
            <button className="editComment" onClick={() => {
                dispatch({type: commentActions.EDIT_MODE, payload: !state.edit})
            }}>Edit</button>
            <button className="deleteComment" onClick={() => props.deleteComment(props.data.commentId)} >X</button>
        </div>
    </div>
}

export default connect(
    () => {
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