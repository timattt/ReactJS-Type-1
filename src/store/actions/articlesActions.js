import {ArticlesActionTypes} from "../constants";

const articles_url = "http://" + process.env.REACT_APP_BACKEND_IP + ":" + process.env.REACT_APP_BACKEND_PORT + "/articles"

export const changeArticlesSortingType = (newType) => {
    console.log("Changing articles sorting type to: [" + newType + "]")
    return {
        type: ArticlesActionTypes.changeArticlesSortingType,
        payload: newType
    }
}

export function loadArticles() {
    console.log("Loading articles")
    return dispatch => {
        return fetch(articles_url).then((response) => response.json()).then((comments) => {
            dispatch({
                type: ArticlesActionTypes.loadArticles,
                payload: comments
            })
        }).catch((err) => {
            console.log("Error while fetching in loadArticles: " + err)
        })
    }
}

export function addArticle(text, title) {
    console.log("Adding new article with text: [" + text + "], title: [" + title + "]")
    return dispatch => {
        const body = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({title: title, text: text, creationTime: Date.now()})
        }
        return fetch(articles_url, body).then(response => response.json()).then(article => {
            dispatch({
                type: ArticlesActionTypes.addArticle,
                payload: article
            })
        }).catch(err => {
            console.log("Error while fetching in addArticle: " + err)
        })
    }
}

export function deleteArticle(articleId) {
    console.log("Removing article with id: [" + articleId + "]")
    return dispatch => {
        const body = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }
        return fetch(articles_url + '/' + articleId, body).then(() => {
            dispatch({
                type: ArticlesActionTypes.removeArticle,
                payload: articleId
            })
        }).catch(err => {
            console.log("Error while fetching in addArticle: " + err)
        })
    }
}

export function likeArticle(articleId) {
    console.log("Like article with id: [" + articleId + "]")
    return dispatch => {
        const body = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
        }
        return fetch(articles_url + `/like?id=${articleId}`, body).then(() => {
            dispatch({
                type: ArticlesActionTypes.likeArticle,
                payload: articleId
            })
        }).catch(err => {
            console.log("Error while fetching in likeArticle: " + err)
        })
    }
}

export function unlikeArticle(articleId) {
    console.log("Unlike article with id: [" + articleId + "]")
    return dispatch => {
        const body = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
        }
        return fetch(articles_url + `/unlike?id=${articleId}`, body).then(() => {
            dispatch({
                type: ArticlesActionTypes.unlikeArticle,
                payload: articleId
            })
        }).catch(err => {
            console.log("Error while fetching in unlikeArticle: " + err)
        })
    }
}