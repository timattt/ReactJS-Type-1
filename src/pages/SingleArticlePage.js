import CardComponent from "../components/Card";
import {connect} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";

export const SingleArticlePage = connect(
    (state) => {
        return {
            articles: state.articlesReducer.articles
        }
    },
    (dispatch) => {
        return {}
    }
)((props) => {
    const {id} = useParams()
    const navigate = useNavigate()

    if (isNaN(+id)) {
        navigate("/articles")
        return
    }

    const articlesWithSameID = props.articles.filter(item => item.articleId === +id)

    if (articlesWithSameID.length !== 1) {
        navigate("/articles")
        return
    }

    const article = articlesWithSameID[0]

    return <div style={{
        display: 'flex',
        justifyContent: 'top',
        height: '100vh',
        flexDirection: 'column'
    }}>
        <h1 style={{textAlign: 'center'}}>Single article page</h1>
        <CardComponent article = {article}></CardComponent>
    </div>
});