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
    const token = window.localStorage.getItem("type1token")
    console.log("Loading articles")
    return dispatch => {
        return fetch(articles_url,{ headers: {
            "Authorization": 'Bearer ' + token
        }}).then((response) => response.json()).then((comments) => {
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
    const token = window.localStorage.getItem("type1token")
    console.log("Adding new article with text: [" + text + "], title: [" + title + "]")
    return dispatch => {
        const body = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
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
    const token = window.localStorage.getItem("type1token")
    console.log("Removing article with id: [" + articleId + "]")
    return dispatch => {
        const body = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        }
        return fetch(articles_url + '/' + articleId, body).then(response => response.json()).then(() => {
            dispatch({
                type: ArticlesActionTypes.removeArticle,
                payload: articleId
            })
        }).catch(err => {
            console.log("Error while fetching in addArticle: " + err)
        })
    }
}

export function editArticle(articleId, text, title) {
    const token = window.localStorage.getItem("type1token")
    console.log("Article with id: [" + articleId + "] edited to text: [" + text + "], title: [" + title + "]")
    return dispatch => {
        const body = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({articleId: articleId, title: title, text: text})
        }
        return fetch(articles_url, body).then(response => response.json()).then(article => {
            dispatch({
                type: ArticlesActionTypes.editArticle,
                payload: article
            })
        }).catch(err => {
            console.log("Error while fetching in editArticle: " + err)
        })
    }
}

export function likeArticle(articleId) {
    const token = window.localStorage.getItem("type1token")
    console.log("Like article with id: [" + articleId + "]")
    return dispatch => {
        const body = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        }
        return fetch(articles_url + '/' + articleId + '/like', body).then(() => {
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
    const token = window.localStorage.getItem("type1token")
    console.log("Unlike article with id: [" + articleId + "]")
    return dispatch => {
        const body = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        }
        return fetch(articles_url + '/' + articleId + '/unlike', body).then(() => {
            dispatch({
                type: ArticlesActionTypes.unlikeArticle,
                payload: articleId
            })
        }).catch(err => {
            console.log("Error while fetching in unlikeArticle: " + err)
        })
    }
}