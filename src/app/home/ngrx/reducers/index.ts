import {
  createFeatureSelector as cfs,
  createSelector as cs,
  ActionReducerMap
} from '@ngrx/store';
import * as fromRoot from '../../../ngrx/reducers/index';
import * as fromQuestion from './question.reducer';
import * as fromAuth from '../../../core/ngrx/reducers/index';
import { Question } from '../../../utils/index';

export interface QuestionState {
  questions: fromQuestion.State;
}

export interface State extends fromRoot.State {
  questions: QuestionState;
}

export const reducers: ActionReducerMap<QuestionState> = {
  questions: fromQuestion.reducer,
};

export const selectQuestionState = cfs<QuestionState>('question');

export const getQuestionEntitiesState = cs(
  selectQuestionState,
  state => state.questions
);

export const getCurrentSelectQuestionId = cs(
  getQuestionEntitiesState,
  fromQuestion.getCurrentQuestionId,
);

export const {
  selectIds: getQuestionIds,
  selectEntities: getQuestionEntities,
  selectAll: getAllQuestions,
  selectTotal: getTotalQuestions,
} = fromQuestion.adapter.getSelectors(getQuestionEntitiesState);

export const getCurrentSelectQuestion = cs(
  getQuestionEntities,
  getCurrentSelectQuestionId,
);

export const getLoadedQuestions = cs(
  getQuestionEntities,
  fromAuth.getLogedUser,
  (state, auth) => {
    return Object
      .values(state)
      .map(s => ({
        ...s,
        upCount: s.upUserIds ? s.upUserIds.length : 0,
        hasUp: s.upUserIds.includes(auth.id),
      }));
  },
);
