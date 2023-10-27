import './styles/Card.css'
import React from 'react';
import Comment from "./Comment";
import NewCommentsCreator from "./NewCommentsCreator";

class CardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            showComments: false
        }

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
        return (<div className="CardComponent">
            <button className="likeButton" onClick={this.clickHandler} style={{backgroundColor: (this.state.liked ? "blue" : "white")}}>
                LIKE!
            </button>
            <h2>{title}</h2>
            {text}
            <h3 className="likesCount">Likes: {currentLikes + this.state.liked}</h3>
            <button className="showComments" onClick={() => {this.setState((prev) => ({...prev, showComments: !prev.showComments}))}}>Show comments</button>
            {
                    this.state.showComments ?
                    <div className="commentsHolder">
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