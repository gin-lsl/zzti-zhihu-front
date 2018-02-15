import {
  createFeatureSelector as cfs,
  createSelector as cs,
  ActionReducerMap
} from '@ngrx/store';
import * as fromRoot from '../../root/reducers/index';
import * as fromReply from './reply.reducer';
import * as fromQuestion from '../../question/reducers/index';

export interface ReplyModuleState {
  replies: fromReply.State;
}

export interface State extends fromRoot.State {
  replies: ReplyModuleState;
}

export const reducers: ActionReducerMap<ReplyModuleState> = {
  replies: fromReply.reducer,
};

export const selectReplyState = cfs<ReplyModuleState>('replyModule');

export const getReplyEntitiesState = cs(
  selectReplyState,
  state => state ? state.replies : null
);

export const getCurrentSelectReplyId = cs(
  getReplyEntitiesState,
  fromReply.getCurrentReplyId,
);

export const {
  selectIds: getReplyIds,
  selectEntities: getReplyEntities,
  selectAll: getAllReplies,
  selectTotal: getTotalReplies,
} = fromReply.adapter.getSelectors(getReplyEntitiesState);

/**
 * 获取当前选择的`Question`的所有`Reply`
 */
export const getRepliesByCurrentSelectQuestionId = cs(
  getReplyEntities,
  fromQuestion.getCurrentSelectQuestionId,
  (replies, quesitonId) => {
    return Object.values(replies)
      .filter(r => r.questionId === quesitonId)
      .map(r => ({ ...r }));
  }
);
