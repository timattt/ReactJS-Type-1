import { combineReducers } from 'redux'
import {articlesReducer} from "./articles-reducer";
import {commentsReducer} from "./comments-reducer";

export const rootReducer = combineReducers({
    articlesReducer,
    commentsReducer
})