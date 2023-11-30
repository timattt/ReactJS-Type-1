import styles from '../styles/Card.module.scss'
import React from 'react';
import Comment from "./Comment";
import NewCommentsCreator from "./NewCommentsCreator";
import classNames from "classnames/bind";

class CardComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            showComments: false
        }
        this.cx = classNames.bind(styles)
        this.clickHandler = this.clickHandler.bind(this)
    }

    clickHandler() {
        this.setState((prev) => ({
            ...prev,
            liked: !prev.liked
        }))
    }

    render() {
        let {title, text, currentLikes} = this.props.article
        return (<div className={this.cx(styles.CardComponent, {liked: this.state.liked})}>
            <button className={this.cx(styles.likeButton)} onClick={this.clickHandler} style={{backgroundColor: (this.state.liked ? "blue" : "white")}}>
                LIKE!
            </button>
            <h2>{title}</h2>
            {text}
            <h3 className={this.cx(styles.likesCount)}>Likes: {currentLikes + this.state.liked}</h3>
            <button className={this.cx(styles.showComments)} onClick={() => {this.setState((prev) => ({...prev, showComments: !prev.showComments}))}}>Show comments</button>
            {
                    this.state.showComments ?
                    <div className={this.cx(styles.commentsHolder)}>
                    {
                        this.props.comments.map((item) => {
                            return <Comment key={item.commentId}
                                            data={item}
                                            deleteCommentCallback={this.props.deleteComment}/>
                        })
                    }
                    <NewCommentsCreator insertCommentCallback={this.props.addNewComment} articleId={this.props.article.articleId}/>
                    </div> : <div/>
            }
        </div>);
    }
}

export default CardComponent;