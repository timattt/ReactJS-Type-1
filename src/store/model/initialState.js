import {AuthResultTypes, SortingTypes} from "../constants";

export const initialState = () => ({
    comments: [],
    articles: [],
    commentsSortingType: SortingTypes.byDate,
    articlesSortingType: SortingTypes.byDate,
    token: window.localStorage.getItem("type1token")
})