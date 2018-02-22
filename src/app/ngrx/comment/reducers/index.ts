import { createFeatureSelector as cfs, createSelector as cs, ActionReducerMap } from '@ngrx/store';

import * as fromRoot from '../../root/reducers/index';
import * as fromComment from './comment.reducer';
import * as fromQuestion from '../../question/reducers/index';
import * as fromReply from '../../reply/reducers/index';

export interface CommentModuleState {
  comments: fromComment.State;
}

export interface State extends fromRoot.State {
  comments: CommentModuleState;
}

export const reducers: ActionReducerMap<CommentModuleState> = {
  comments: fromComment.reducer,
};

export const selectCommentState = cfs<CommentModuleState>('commentModule');

const getCommentEntitiesState = cs(selectCommentState, state => state ? state.comments : null);

const getgetCurrentSelectCommentId = cs(getCommentEntitiesState, fromComment.getCurrentCommentId);

const {
  selectIds: getCommentIds,
  selectEntities: getCommentEntities,
  selectAll: getAllComments,
  selectTotal: getTotalComments,
} = fromComment.adapter.getSelectors(getCommentEntitiesState);

export const getCommentsByCurrentQuestionIdAndCurrentReplyId = cs(
  getCommentEntities,
  fromQuestion.getCurrentSelectQuestionId,
  fromReply.getCurrentSelectReplyId,
  (commentEntities, questionId, replyId) => {
    console.log('commentEntities: ', commentEntities);
    const filteredByQuestionId = Object.values(commentEntities)
      .filter(c => c.questionId === questionId);
    if (replyId != null) {
      return filteredByQuestionId.filter(c => c.replyId === replyId);
    }
    return filteredByQuestionId;
  }
);

export const getCommentsByCurrentQuestionIdAndReplyId = (replyId: string) => {
  return cs(getCommentEntities, fromQuestion.getCurrentSelectQuestionId, (commentEntities, questionId) => {
    console.log('getCommentsByCurrentQuestionIdAndReplyId: ', commentEntities);
    const filteredByQuestionId = Object.values(commentEntities)
      .filter(c => c.questionId === questionId);
    if (replyId != null) {
      return filteredByQuestionId.filter(c => c.replyId === replyId);
    }
    return filteredByQuestionId;
  });
};
