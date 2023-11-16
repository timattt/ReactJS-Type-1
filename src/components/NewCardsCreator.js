import { useState } from "react";
import styles from '../styles/NewCardsCreator.module.scss'
import classNames from "classnames/bind";
import { useMediaQuery } from 'usehooks-ts'
import {connect} from "react-redux";
import {addArticle} from "../store/actions/articlesActions";

function NewCardsCreator(props) {
    const [title, setTitle] = useState("New title")
    const [text, setText] = useState("Some text...")
    const matches = useMediaQuery('(min-width: 1000px)')
    const cx = classNames.bind(styles)

    return <div className={cx(styles.creatorHolder, {small: matches})}>
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
            <input className={styles.submit} type="submit" value="Send" />

        </form>
    </div>
}

export default connect(
    (state) => {
        return {}
    },
    (dispatch) => {
        return {addNewArticle: (text, title) => dispatch(addArticle(text, title))}
    }
)(NewCardsCreator);