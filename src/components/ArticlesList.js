import {connect} from "react-redux";
import styles from "../styles/ArticlesList.module.scss";
import CardComponent from "./Card";
import {SortingTypes} from "../store/constants";

function ArticlesList(props) {
    return <div className={styles.cardsHolder}>
        {
            props.articles.sort((a, b) => {
                if (props.articlesSortingType === SortingTypes.byDate) {
                    return new Date(a.creationTime).getTime() - new Date(b.creationTime).getTime()
                }
                if (props.articlesSortingType === SortingTypes.byLikes) {
                    return -a.likesCount + b.likesCount
                }
                return 0
            }).map((item, i) => {
                return <CardComponent key={item.articleId}
                                      article={item}
                ></CardComponent>})
        }
    </div>
}

export default connect(
    (state) => {
        return {
            articles: state.articlesReducer.articles,
            articlesSortingType: state.articlesReducer.articlesSortingType
        }
    }
)(ArticlesList);