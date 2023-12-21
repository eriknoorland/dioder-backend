const colourBroker = require('../broker');
const makeSetColour = require('./setColour');
// import makeEditComment from './edit-comment'
// import makeRemoveComment from './remove-comment'
// import makeListComments from './list-comments'
// import makeHandleModeration from './handle-moderation'
// import commentsDb from '../data-access'
// import isQuestionable from '../is-questionable'

const setColour = makeSetColour({ colourBroker });
// const editComment = makeEditComment({ commentsDb, handleModeration })
// const listComments = makeListComments({ commentsDb })
// const removeComment = makeRemoveComment({ commentsDb })

module.exports = Object.freeze({
  setColour,
  // editComment,
  // handleModeration,
  // listComments,
  // removeComment,
});