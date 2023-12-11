import {connect, Provider} from 'react-redux'
import {loadArticles} from "./store/actions/articlesActions";
import {loadComments} from "./store/actions/commentsActions";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {ArticlesPage} from "./pages/ArticlesPage";
import CoreLayout from "./pages/CoreLayout";
import {NotFoundPage} from "./pages/NotFoundPage";
import {SingleArticlePage} from "./pages/SingleArticlePage";
import React, {useEffect} from "react";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./store/reducers/root-reducer";
import thunkMiddleware from "redux-thunk";

const App = connect(
    (state) => {return {token: state.authReducer.token}},
    (dispatch) => {
      return {loadComments: () => dispatch(loadComments()), loadArticles: () => dispatch(loadArticles())}
    }
)((props) => {
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
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegistrationPage/>}/>
        </Route>
    </Routes>
});

const store = createStore(rootReducer, applyMiddleware(
    thunkMiddleware
))

export default function AppWrapper() {
    return <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
}
