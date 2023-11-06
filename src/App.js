import CardComponent from './components/Card'
import NewCardsCreator from "./components/NewCardsCreator";
import './styles/App.css'
import {useState} from "react";

const articles_url = "http://" + process.env.REACT_APP_BACKEND_IP + ":" + process.env.REACT_APP_BACKEND_PORT + "/articles"
const comments_url = "http://" + process.env.REACT_APP_BACKEND_IP + ":" + process.env.REACT_APP_BACKEND_PORT + "/comments"

function App() {
  const [comments, setComments] = useState([])
  const [articles, setArticles] = useState([])

  fetch(articles_url).then(res => res.json()
  ).then(data => {
    const old = JSON.stringify(articles)
    const newData = JSON.stringify(data)
    if (old !== newData) {
      setArticles([...data])
    }
  }).catch((res) => {
    console.error("Failed to fetch articles from: [" + articles_url + "]")
  })
  fetch(comments_url).then(res => res.json()
  ).then(data => {
    const old = JSON.stringify(comments)
    const newData = JSON.stringify(data)
    if (old !== newData) {
      setComments([...data])
    }
  }).catch((res) => {
    console.error("Failed to fetch comments from: [" + comments_url + "]")
  })

  function addNewArticle(text, title) {
    const body = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({title: title, text: text})
    }
    fetch(articles_url, body).then(() => {
      setComments([...comments, {articleId: -1, title: title, text: text, currentLikes: 0, commentsCount: 0}])
    });
  }

  function addNewComment(newCommentText, articleId) {
    const body = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({author: 'admin', text: newCommentText, articleId: articleId})
    }
    fetch(comments_url, body).then(() => {
      setComments([...comments, {commentId: -1, author: 'admin', text: newCommentText, articleId: articleId}])
    });
  }

  function deleteComment(commentId) {
    const body = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
    fetch(comments_url + '/' + commentId, body).then(() => {
      setComments(comments.filter((item) => item.commentId !== commentId))
    });
  }

  return <div className="mainHolder">
    <NewCardsCreator addNewArticle={addNewArticle}/>
    <div className="cardsHolder">
      {
        articles.map((item, i) => {
        return <CardComponent key={item.articleId}
                              article={item}
                              comments={comments.filter((comm) => { return comm.articleId === item.articleId})}
                              addNewComment={addNewComment}
                              deleteComment={deleteComment}
        ></CardComponent>})
      }
    </div>
  </div>
}

export default App;
