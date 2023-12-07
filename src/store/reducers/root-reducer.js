import { combineReducers } from 'redux'
import {articlesReducer} from "./articles-reducer";
import {commentsReducer} from "./comments-reducer";
import {authReducer} from "./auth-reducer";

export const rootReducer = combineReducers({
    articlesReducer,
    commentsReducer,
    authReducer
})