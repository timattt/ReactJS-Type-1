export const CommentsActionTypes = {
    loadComments: 'LOAD_COMMENTS',
    addComment: 'ADD_COMMENT',
    removeComment: 'REMOVE_COMMENT',
    changeCommentsSortingType: 'CHANGE_COMMENTS_SORTING',
    editComment: 'EDIT_COMMENT',
    likeComment: 'LIKE_COMMENT',
    unlikeComment: 'UNLIKE_COMMENT'
}

export const ArticlesActionTypes = {
    loadArticles: 'LOAD_ARTICLES',
    changeArticlesSortingType: 'CHANGE_ARTICLE_SORTING',
    addArticle: 'ADD_ARTICLE',
    editArticle: 'EDIT_ARTICLE',
    removeArticle: 'REMOVE_ARTICLE',
    likeArticle: 'LIKE_ARTICLE',
    unlikeArticle: 'UNLIKE_ARTICLE'
}

export const SortingTypes = {
    byDate: 'BY_DATE',
    byLikes: 'BY_LIKES'
}