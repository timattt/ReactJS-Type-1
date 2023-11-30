import localArticles from './assets/articles.json'
import localComments from './assets/comments.json'
import CardComponent from './components/Card'
import NewCardsCreator from "./components/NewCardsCreator";
import './App.css'
import {useState} from "react";

function App() {
  const [comments, setComments] = useState(localComments)
  const [articles, setArticles] = useState(localArticles)

  const [idGenerator, setIdGenerator] = useState(100)

  function addNewArticle(text, title) {
    // STUB
    setArticles([{text: text, title: title, articleId: idGenerator, currentLikes: 0, commentsCount: 0}, ...articles])
    setIdGenerator(idGenerator + 1)
  }

  function addNewComment(newCommentText, articleId) {
    // STUB
    const newComment = {author: "admin", commentId: idGenerator, text: newCommentText, articleId: articleId}
    setIdGenerator(idGenerator + 1)
    setComments([...comments, newComment])
  }

  function deleteComment(commentId) {
    // STUB
    setComments(comments.filter((item) => {return item.commentId !== commentId}))
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
