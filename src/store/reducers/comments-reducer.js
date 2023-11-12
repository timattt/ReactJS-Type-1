import {CommentsActionTypes} from "../constants";
import {initialState} from "../model/initialState";

export const commentsReducer = (state = initialState(), action) => {
    switch (action.type) {
        case CommentsActionTypes.loadComments: {
            return {
                ...state,
                comments: action.payload
            }
        }
        case CommentsActionTypes.addComment: {
            return {
                ...state,
                comments: [...state.comments, action.payload]
            }
        }
        case CommentsActionTypes.removeComment: {
            return {
                ...state,
                comments: state.comments.filter((com) => com.commentId !== action.payload)
            }
        }
        case CommentsActionTypes.changeCommentsSortingType: {
            return {
                ...state,
                commentsSortingType: action.payload,
            }
        }
        case CommentsActionTypes.likeComment: {
            return {
                ...state,
                comments: state.comments.map(comment => {
                    if (comment.commentId === action.payload) {
                        return {...comment, likesCount: comment.likesCount + 1, liked: true }
                    } else {
                        return comment
                    }
                })
            }
        }
        case CommentsActionTypes.unlikeComment: {
            return {
                ...state,
                comments: state.comments.map(comment => {
                    if (comment.commentId === action.payload) {
                        return {...comment, likesCount: comment.likesCount - 1, liked: false }
                    } else {
                        return comment
                    }
                })
            }
        }
        default: {
            return state
        }
    }
}