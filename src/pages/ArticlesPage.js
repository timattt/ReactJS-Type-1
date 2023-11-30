import styles from "../styles/App.module.scss";
import NewCardsCreator from "../components/NewCardsCreator";
import ArticlesList from "../components/ArticlesList";
import {connect} from "react-redux";
import {changeArticlesSortingType} from "../store/actions/articlesActions";
import {SortingTypes} from "../store/constants";

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

export function ArticlesPage() {
    return <div className={styles.mainHolder}>
        <NewCardsCreator/>
        <ArticlesList/>
        <SortingSelector/>
    </div>
}