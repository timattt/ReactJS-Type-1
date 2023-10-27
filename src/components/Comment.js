import './styles/Comment.css'

export default function Comment(props) {
    const {author, text, commentId} = props.data
    return <div className="Comment">
        <div className="authorTab">{author}:</div>
        <div className="textTab">{text}</div>
        <button className="deleteComment" onClick={() => props.deleteCommentCallback(commentId)} >X</button>
    </div>
}