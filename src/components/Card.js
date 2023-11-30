import styles from '../styles/Card.module.scss'
import React, {useReducer, useState} from 'react';
import Comment from "./Comment";
import NewCommentsCreator from "./NewCommentsCreator";
import classNames from "classnames/bind";
import {connect} from "react-redux";
import {changeCommentsSortingType} from "../store/actions/commentsActions";
import {SortingTypes} from "../store/constants";
import {deleteArticle, editArticle, likeArticle, unlikeArticle} from "../store/actions/articlesActions";
import {useNavigate} from "react-router-dom";

const cardActionTypes = {
    LIKES_CHANGED: "LIKE",
    TEXT_CHANGED: "TEXT",
    TITLE_CHANGED: "TITLE"
}

function cardReducer(state = {}, action) {
    switch (action.type) {
        default:
            return state
        case cardActionTypes.TITLE_CHANGED:
            return {...state, title: action.payload}
        case cardActionTypes.TEXT_CHANGED:
            return {...state, text: action.payload}
        case cardActionTypes.LIKES_CHANGED:
            return {...state, liked: action.payload}
    }
}

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
        const creationDate = new Date(props.article.creationTime)
        const navigate = useNavigate()

        return <div className={styles.topToolbar}>
            {"Created at " + creationDate.getHours() + ":" + creationDate.getMinutes() + ":" + creationDate.getSeconds()}
            <button className={styles.deleteButton} onClick={() => {
                props.deleteArticle(props.article.articleId)
            }}>
                Delete
            </button>
            <button className={styles.likeButton} onClick={() => {
                if (props.state.liked) {
                    props.unlikeArticle(props.article.articleId)
                } else {
                    props.likeArticle(props.article.articleId)
                }
                props.dispatch({type: cardActionTypes.LIKES_CHANGED, payload: !props.state.liked})
            }} style={{backgroundColor: (props.liked ? "blue" : "white")}}>
                LIKE!
            </button>
            <button className={styles.expandButton} onClick={() => {
                navigate("/articles/" + props.article.articleId)
            }}>
              Expand
            </button>
        </div>
})

function ViewContent(props) {
    const {likesCount} = props.props.article
    return <div>
        <h2>{props.state.title}</h2>
        {props.state.text}
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

    return <div className={styles.editPane}>
        <form onSubmit={(event) => {
            event.preventDefault();
            props.editArticle(articleId, props.state.text, props.state.title)
        }}>
            <textarea value={props.state.title} onChange={(event) => {
                props.dispatch({type: cardActionTypes.TITLE_CHANGED, payload: event.target.value})
            }}/>
            <br/>
            <textarea value={props.state.text} onChange={(event) => {
                props.dispatch({type: cardActionTypes.TEXT_CHANGED, payload: event.target.value})
            }}/>
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
    const [state, dispatch] = useReducer(cardReducer, {
        liked: props.article.liked,
        text: props.article.text,
        title: props.article.title
    })

    return (<div className={cx(styles.CardComponent, {liked: state.liked})}>
        <TopToolbar article={props.article} state={state} dispatch={dispatch}/>
        {
            isViewMode ?
            <ViewContent props={props} state={state} dispatch={dispatch}/> :
            <EditContent props={props} state={state} dispatch={dispatch}/>
        }
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