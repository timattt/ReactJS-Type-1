import styles from '../styles/Card.module.scss'
import React, {useState} from 'react';
import Comment from "./Comment";
import NewCommentsCreator from "./NewCommentsCreator";
import classNames from "classnames/bind";
import {connect} from "react-redux";
import {changeCommentsSortingType} from "../store/actions/commentsActions";
import {SortingTypes} from "../store/constants";
import {deleteArticle, editArticle, likeArticle, unlikeArticle} from "../store/actions/articlesActions";

const TopToolbar = connect(
    () => {
        return {}
    },
    (dispatch) => {
        return {
            likeArticle: (articleId) => dispatch(likeArticle(articleId)),
            unlikeArticle: (articleId) => dispatch(unlikeArticle(articleId)),
            deleteArticle: (articleId) => dispatch(deleteArticle(articleId))
        }
    })((props) => {
        const [liked, setLiked] = useState(false)
        const creationDate = new Date(props.article.creationTime)
        return <div className={styles.topToolbar}>
            {"Created at " + creationDate.getHours() + ":" + creationDate.getMinutes() + ":" + creationDate.getSeconds()}
            <button className={styles.deleteButton} onClick={() => {
                props.deleteArticle(props.article.articleId)
            }}>
                Delete
            </button>
            <button className={styles.likeButton} onClick={() => {
                if (liked) {
                    props.unlikeArticle(props.article.articleId)
                } else {
                    props.likeArticle(props.article.articleId)
                }
                setLiked(!liked)
            }} style={{backgroundColor: (liked ? "blue" : "white")}}>
                LIKE!
            </button>
        </div>
})

function ViewContent(props) {
    const {title, text, likesCount} = props.props.article
    return <div>
        <h2>{title}</h2>
        {text}
        <h3 className={styles.likesCount}>Likes: {likesCount}</h3>
    </div>
}

const EditContent = connect(
    (state) => {
        return {}
    },
    (dispatch) => {
        return {editArticle: (articleId, text, title) => dispatch(editArticle(articleId, text, title))}
    }
)((props) => {
    const {likesCount, articleId} = props.props.article

    const [text, setText] = useState(props.props.article.text)
    const [title, setTitle] = useState(props.props.article.title)

    return <div className={styles.editPane}>
        <form onSubmit={(event) => {
            event.preventDefault();
            props.editArticle(articleId, text, title)
        }}>
            <textarea value={title} onChange={(event) => {setTitle(event.target.value)}}/>
            <br/>
            <textarea value={text} onChange={(event) => {setText(event.target.value)}}/>
            <br/>
            <input type="submit" value="Send"/>
        </form>
        <h3 className={styles.likesCount}>Likes: {likesCount}</h3>
    </div>
})

function CardComponent(props) {
    const [showComments, setShowComments] = useState(false)
    const [isViewMode, setIsViewMode] = useState(true)
    const cx = classNames.bind(styles)

    return (<div className={cx(styles.CardComponent, {liked: props.article.liked})}>
        <TopToolbar article={props.article}/>

        {isViewMode ? <ViewContent props={props}/> : <EditContent props={props}/>}

        <div className={styles.bottomToolbar}>
            <button className={cx(styles.showComments)} onClick={() => {setShowComments(!showComments)}}>Show comments</button>
            <button className={cx(styles.edit)} onClick={() => {setIsViewMode(!isViewMode)}}>Edit</button>
            <button className={styles.sortingType} onClick={() => {
                if(props.commentsSortingType === SortingTypes.byLikes) {
                    props.changeCommentsSortingType(SortingTypes.byDate)
                } else {
                    props.changeCommentsSortingType(SortingTypes.byLikes)
                }
            }}>{props.commentsSortingType === SortingTypes.byLikes ? "Likes" : "Date"}</button>
        </div>
        {
                showComments ?
                <div className={cx(styles.commentsHolder)}>
                {
                    props.comments.sort((a, b) => {
                        if (props.commentsSortingType === SortingTypes.byDate) {
                            return new Date(a.creationTime).getTime() - new Date(b.creationTime).getTime()
                        }
                        if (props.commentsSortingType === SortingTypes.byLikes) {
                            return -a.likesCount + b.likesCount
                        }
                        return 0
                    }).map((item) => {
                        return <Comment key={item.commentId}
                                        data={item}/>
                    })
                }
                <NewCommentsCreator articleId={props.article.articleId}/>
                </div> : <div/>
        }
    </div>);
}

export default connect(
(state) => {
        return {
            commentsSortingType: state.commentsReducer.commentsSortingType,
            comments: state.commentsReducer.comments
        }
    },
    (dispatch) => {
        return {changeCommentsSortingType: (newType) => dispatch(changeCommentsSortingType(newType))}
    }
)(CardComponent);