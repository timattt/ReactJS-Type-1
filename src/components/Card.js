import './Card.css'
import React from 'react';

class CardComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            liked: false
        }

        this.clickHandler = this.clickHandler.bind(this)
    }

    clickHandler() {
        this.setState((prev) => ({
            liked: !prev.liked
        }))
    }

    render() {
        let {title, text, currentLikes} = this.props.props
        return (<div className="CardComponent">
            <button className="likeButton" onClick={this.clickHandler} style={{backgroundColor: (this.state.liked ? "blue" : "white")}}>
                LIKE!
            </button>
            <h2>{title}</h2>
            <div className="text">
                {text}
            </div>
            <br/>
            <div className="likesCount">
                <h3>Likes: {currentLikes + this.state.liked}</h3>
            </div>
        </div>);
    }
}

export default CardComponent;