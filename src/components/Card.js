import styles from '../styles/Card.module.scss'
import React, {useState} from 'react';
import Comment from "./Comment";
import NewCommentsCreator from "./NewCommentsCreator";
import classNames from "classnames/bind";
import {connect} from "react-redux";
import {changeCommentsSortingType} from "../store/actions/commentsActions";
import {SortingTypes} from "../store/constants";
import {deleteArticle, likeArticle, unlikeArticle} from "../store/actions/articlesActions";

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

        return <div className={styles.topToolbar}>
            <button className={styles.deleteButton} onClick={() => {
                props.deleteArticle(props.articleId)
            }}>
                Delete
            </button>
            <button className={styles.likeButton} onClick={() => {
                if (liked) {
                    props.unlikeArticle(props.articleId)
                } else {
                    props.likeArticle(props.articleId)
                }
                setLiked(!liked)
            }} style={{backgroundColor: (liked ? "blue" : "white")}}>
                LIKE!
            </button>
        </div>
})

class CardComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showComments: false
        }

        this.cx = classNames.bind(styles)
    }

    render() {
        const {title, text, likesCount} = this.props.article
        return (<div className={this.cx(styles.CardComponent, {liked: this.props.article.liked})}>
            <TopToolbar articleId={this.props.article.articleId}/>
            <h2>{title}</h2>
            {text}
            <h3 className={this.cx(styles.likesCount)}>Likes: {likesCount}</h3>

            <div className={styles.bottomToolbar}>
                <button className={this.cx(styles.showComments)} onClick={() => {this.setState((prev) => ({...prev, showComments: !prev.showComments}))}}>Show comments</button>
                <button className={styles.sortingType} onClick={() => {
                    if(this.props.commentsSortingType === SortingTypes.byLikes) {
                        this.props.changeCommentsSortingType(SortingTypes.byDate)
                    } else {
                        this.props.changeCommentsSortingType(SortingTypes.byLikes)
                    }
                }}>{this.props.commentsSortingType === SortingTypes.byLikes ? "Likes" : "Date"}</button>
            </div>
            {
                    this.state.showComments ?
                    <div className={this.cx(styles.commentsHolder)}>
                    {
                        this.props.comments.sort((a, b) => {
                            if (this.props.commentsSortingType === SortingTypes.byDate) {
                                return new Date(a.creationTime).getTime() - new Date(b.creationTime).getTime()
                            }
                            if (this.props.commentsSortingType === SortingTypes.byLikes) {
                                return -a.likesCount + b.likesCount
                            }
                            return 0
                        }).map((item) => {
                            return <Comment key={item.commentId}
                                            data={item}/>
                        })
                    }
                    <NewCommentsCreator articleId={this.props.article.articleId}/>
                    </div> : <div/>
            }
        </div>);
    }
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