import {useState} from "react";

export default function NewCommentsCreator(props) {
    const [text, setText] = useState("")

    return <div>
        <h3>Write new comment:</h3>
        <form style={{display: "inline-flex", flexDirection: "column"}} onSubmit={(event) => {
            event.preventDefault();
            props.insertCommentCallback(text, props.articleId);
            setText("");
        }}>
            <textarea value={text} onChange={(event) => {setText(event.target.value)}}/>
            <input type="submit" value="Send" />
        </form>

    </div>
}