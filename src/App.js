import {connect} from 'react-redux'
import {loadArticles} from "./store/actions/articlesActions";
import {loadComments} from "./store/actions/commentsActions";
import {Route, Routes, useLocation} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {ArticlesPage} from "./pages/ArticlesPage";
import {CoreLayout} from "./pages/CoreLayout";
import {NotFoundPage} from "./pages/NotFoundPage";
import {SingleArticlePage} from "./pages/SingleArticlePage";
import {useEffect} from "react";

function App(props) {
    props.loadArticles()
    props.loadComments()

    const location = useLocation();

    useEffect(() => {
        console.log("Changed route to " + location.pathname)
    }, [location.pathname])

    return <Routes>
        <Route path="/" element={<CoreLayout/>}>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/articles" element={<ArticlesPage/>}/>
            <Route path="/articles/:id" element={<SingleArticlePage/>}/>
            <Route path="/*" element={<NotFoundPage/>}/>
        </Route>
    </Routes>
}

export default connect(
    () => {return {}},
    (dispatch) => {
      return {loadComments: () => dispatch(loadComments()), loadArticles: () => dispatch(loadArticles())}
    }
)(App);
