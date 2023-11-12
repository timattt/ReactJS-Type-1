import {CommentsActionTypes} from '../constants'

const comments_url = "http://" + process.env.REACT_APP_BACKEND_IP + ":" + process.env.REACT_APP_BACKEND_PORT + "/comments"

export const changeCommentsSortingType = (newType) => {
    console.log("Changing comments sorting type to: [" + newType + "]")
    return {
        type: CommentsActionTypes.changeCommentsSortingType,
        payload: newType
    }
}

export function loadComments() {
    console.log("Loading comments")
    return dispatch => {
        return fetch(comments_url).then((response) => response.json()).then((comments) => {
            dispatch({
                type: CommentsActionTypes.loadComments,
                payload: comments
            })
        }).catch((err) => {
            console.log("Error while fetching in loadComments: " + err)
        })
    }
}

export function addNewComment(newCommentText, articleId) {
    console.log("Adding new comment with text: [" + newCommentText + "], articleId: [" + articleId + "]")
    return dispatch => {
        const body = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({author: 'admin', text: newCommentText, articleId: articleId})
        }
        return fetch(comments_url, body).then(response => response.json()).then(comment => {
            dispatch({
                type: CommentsActionTypes.addComment,
                payload: comment
            })
        }).catch(err => {
            console.log("Error while fetching in addNewComment: " + err)
        })
    }
}

export function deleteComment(commentId) {
    console.log("Deleting comment with id: [" + commentId + "]")
    return dispatch => {
        const body = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }
        return fetch(comments_url + '/' + commentId, body).then(() => {
            dispatch({
                type: CommentsActionTypes.removeComment,
                payload: commentId
            })
        }).catch(err => {
            console.log("Error while fetching in deleteComment: " + err)
        })
    }
}

export function likeComment(commentId) {
    console.log("Like comment with id: [" + commentId + "]")
    return dispatch => {
        const body = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
        }
        return fetch(comments_url + `/like?id=${commentId}`, body).then(() => {
            dispatch({
                type: CommentsActionTypes.likeComment,
                payload: commentId
            })
        }).catch(err => {
            console.log("Error while fetching in likeComment: " + err)
        })
    }
}

export function unlikeComment(commentId) {
    console.log("Unlike comment with id: [" + commentId + "]")
    return dispatch => {
        const body = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
        }
        return fetch(comments_url + `/unlike?id=${commentId}`, body).then(() => {
            dispatch({
                type: CommentsActionTypes.unlikeComment,
                payload: commentId
            })
        }).catch(err => {
            console.log("Error while fetching in unlikeComment: " + err)
        })
    }
}