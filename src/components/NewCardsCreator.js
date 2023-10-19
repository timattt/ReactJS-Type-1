import {useState} from "react";
import './NewCardsCreator.css'

export default function NewCardsCreator(props) {
    const [title, setTitle] = useState("New title")
    const [text, setText] = useState("Some text...")

    return <div className="creatorHolder">
        <form onSubmit={(event) => {
            event.preventDefault();
            props.addNewArticle(text, title);
        }}>
            <h2>Articles creator</h2>
            <h3>Title:</h3>
            <textarea value={title} onChange={(event) => {setTitle(event.target.value)}}/>
            <h3>Text:</h3>
            <textarea value={text} onChange={(event) => {setText(event.target.value)}}/>
            <br/>
            <input className="submit" type="submit" value="Send" />

        </form>
    </div>

}