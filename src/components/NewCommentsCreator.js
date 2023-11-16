import {useState} from "react";
import {connect} from "react-redux";
import {addNewComment} from "../store/actions/commentsActions";

function NewCommentsCreator(props) {
    const [text, setText] = useState("")
    return <div>
        <h3>Write new comment:</h3>
        <form style={{display: "inline-flex", flexDirection: "column"}} onSubmit={(event) => {
            event.preventDefault();
            props.addNewComment(text, props.articleId);
            setText("");
        }}>
            <textarea value={text} onChange={(event) => {setText(event.target.value)}}/>
            <input type="submit" value="Send" />
        </form>
    </div>
}

export default connect(
    (state) => {
        return {}
    },
    (dispatch) => {
        return {addNewComment: (newCommentText, articleId) => dispatch(addNewComment(newCommentText, articleId))}
    }
)(NewCommentsCreator);