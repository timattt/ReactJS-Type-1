import NewCardsCreator from "./components/NewCardsCreator";
import styles from './styles/App.module.scss'
import {connect} from 'react-redux'
import {changeArticlesSortingType, loadArticles} from "./store/actions/articlesActions";
import ArticlesList from "./components/ArticlesList";
import {loadComments} from "./store/actions/commentsActions";
import {SortingTypes} from "./store/constants";

const SortingSelector = connect(
    (state) => {
        return {
            articlesSortingType: state.articlesReducer.articlesSortingType
        }
    },
    (dispatch) => {
        return {changeArticlesSortingType: (newType) => dispatch(changeArticlesSortingType(newType))}
    }
)((props) => {
    return <div>
        <button onClick={() => {
            if(props.articlesSortingType === SortingTypes.byLikes) {
                props.changeArticlesSortingType(SortingTypes.byDate)
            } else {
                props.changeArticlesSortingType(SortingTypes.byLikes)
            }
        }}>{props.articlesSortingType === SortingTypes.byLikes ? "Likes" : "Date"}</button>
    </div>
})

function App(props) {
  props.loadArticles()
  props.loadComments()

  return <div className={styles.mainHolder}>
      <NewCardsCreator/>
      <ArticlesList/>
      <SortingSelector/>
    </div>
}

export default connect(
    () => {return {}},
    (dispatch) => {
      return {loadComments: () => dispatch(loadComments()), loadArticles: () => dispatch(loadArticles())}
    }
)(App);
