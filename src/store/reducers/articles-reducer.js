import {ArticlesActionTypes} from "../constants";
import {initialState} from "../model/initialState";

export const articlesReducer = (state = initialState(), action) => {
    switch (action.type) {
        case ArticlesActionTypes.loadArticles: {
            return {
                ...state,
                articles: action.payload,
            }
        }
        case ArticlesActionTypes.changeArticlesSortingType: {
            return {
                ...state,
                articlesSortingType: action.payload,
            }
        }
        case ArticlesActionTypes.addArticle: {
            return {
                ...state,
                articles: [action.payload, ...state.articles],
            }
        }
        case ArticlesActionTypes.removeArticle: {
            return {
                ...state,
                articles: state.articles.filter(article => article.articleId !== action.payload)
            }
        }
        case ArticlesActionTypes.likeArticle: {
            return {
                ...state,
                articles: state.articles.map(article => {
                    if (article.articleId === action.payload) {
                        return {...article, likesCount: article.likesCount + 1, liked: true }
                    } else {
                        return article
                    }
                })
            }
        }
        case ArticlesActionTypes.unlikeArticle: {
            return {
                ...state,
                articles: state.articles.map(article => {
                    if (article.articleId === action.payload) {
                        return {...article, likesCount: article.likesCount - 1, liked: false }
                    } else {
                        return article
                    }
                })
            }
        }
        case ArticlesActionTypes.editArticle: {
            return {
                ...state,
                articles: state.articles.map(article => {
                    if (article.articleId === action.payload.articleId) {
                        return action.payload
                    } else {
                        return article
                    }
                })
            }
        }
        default: {
            return state
        }
    }
}