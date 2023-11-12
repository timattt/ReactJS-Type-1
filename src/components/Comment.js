import styles from '../styles/Comment.module.scss'
import {connect} from "react-redux";
import {deleteComment, likeComment, unlikeComment} from "../store/actions/commentsActions";
import classNames from "classnames/bind";

function Comment(props) {
    const {author, text, commentId, likesCount, liked, creationTime} = props.data

    const cx = classNames.bind(styles)

    const creationDate = new Date(creationTime)

    return <div className={cx(styles.Comment, {liked: liked})}>
        <div className="authorTab">{creationDate.getHours() + ':' + creationDate.getMinutes() + ':' + creationDate.getSeconds() + ' : ' + author}:</div>
        <div className="textTab">{text}</div>
        <div>
            Likes: {likesCount}
            <button className="likeComment" onClick={() => {
                if (liked) {
                    props.unlikeComment(commentId)
                } else {
                    props.likeComment(commentId)
                }
            }}>Like</button>
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