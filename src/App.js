import NewCardsCreator from "./components/NewCardsCreator";
import styles from './styles/App.module.scss'
import {connect} from 'react-redux'
import {loadComments} from "./store/actions/commentsActions";
import {loadArticles} from "./store/actions/articlesActions";
import ArticlesList from "./components/ArticlesList";


function App(props) {
  props.loadArticles()
  props.loadComments()

  return <div className={styles.mainHolder}>
      <NewCardsCreator/>
      <ArticlesList/>
    </div>
}

export default connect(
    () => {return {}},
    (dispatch) => {
      return {loadComments: () => dispatch(loadComments()), loadArticles: () => dispatch(loadArticles())}
    }
)(App);
