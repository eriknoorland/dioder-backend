// import {
//   addComment,
//   editComment,
//   listComments,
//   removeComment
// } from '../use-cases'
// import makeDeleteComment from './delete-comment'
// import makeGetComments from './get-comments'
// import makePostComment from './post-comment'
// import makePatchComment from './patch-comment'
// import notFound from './not-found'

const { setColour } = require('../useCases');
const makePostColour = require('./postColour');

// const deleteComment = makeDeleteComment({ removeComment })
// const getComments = makeGetComments({
//   listComments
// })
const postColour = makePostColour({ setColour });
// const patchComment = makePatchComment({ editComment })

module.exports = Object.freeze({
  // deleteComment,
  // getComments,
  // notFound,
  postColour,
  // patchComment,
});