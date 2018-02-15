import {
  createFeatureSelector as cfs,
  createSelector as cs,
  ActionReducerMap
} from '@ngrx/store';
import * as fromRoot from '../../root/reducers/index';
import * as fromQuestion from './question.reducer';
import * as fromAuth from '../../core/reducers/index';
import { Question } from '../../../utils/index';

export interface QuestionModuleState {
  questions: fromQuestion.State;
}

export interface State extends fromRoot.State {
  questions: QuestionModuleState;
}

export const reducers: ActionReducerMap<QuestionModuleState> = {
  questions: fromQuestion.reducer,
};

export const selectQuestionState = cfs<QuestionModuleState>('questionModule');

export const getQuestionEntitiesState = cs(
  selectQuestionState,
  state => state ? state.questions : null
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
  (entities, currId) => {
    console.log('entities: ', entities  );
    return entities[currId];
  }
);

export const getLoadedQuestions = cs(
  getQuestionEntities,
  fromAuth.getLogedUser,
  (state, auth) => {
    return Object
      .values(state)
      .map(s => ({
        ...s,
        hasUp: s.upUserIds.includes(auth.id),
        hasDown: s.downUserIds.includes(auth.id),
        hasLike: s.saveUserIds.includes(auth.id),
        upCount: s.upUserIds ? s.upUserIds.length : 0,
        downCount: s.downUserIds ? s.downUserIds.length : 0,
      }));
  },
);
