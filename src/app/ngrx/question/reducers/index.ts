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

const getQuestionSortMethod = cs(getQuestionEntitiesState, state => state ? state.sort : 'NEWER_TO_OLDER');

export const getSearchResults = cs(getQuestionEntitiesState, state => {
  console.log('-----------search: ', state.searchResults);
  return state.searchResults;
});

export const getSearchBoxFocus = cs(getQuestionEntitiesState, state => {
  return state.searchBoxFocus;
});

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
  (entities, currId) => entities[currId]
);

export const getLoadedQuestions = cs(
  getQuestionEntities,
  fromAuth.getLogedUser,
  getQuestionSortMethod,
  (state, auth, sort) => {
    const questions = Object
      .values(state)
      .map(s => ({
        ...s,
        hasUp: s.upUserIds.includes(auth.id),
        hasDown: s.downUserIds.includes(auth.id),
        hasLike: s.saveUserIds.includes(auth.id),
        upCount: s.upUserIds ? s.upUserIds.length : 0,
        downCount: s.downUserIds ? s.downUserIds.length : 0,
      }));
    if (sort === 'OLDER_TO_NEWER') {
      return questions.sort((p, c) => ((new Date(p.createAt) as any) - (new Date(c.createAt) as any)));
    }
    return questions.sort((p, c) => ((new Date(c.createAt) as any) - (new Date(p.createAt) as any)));
  },
);

/**
 * 获取相关问题信息
 */
export const getRelates = cs(
  getQuestionEntitiesState,
  state => state.relates,
);
