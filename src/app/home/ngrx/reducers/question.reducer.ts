import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { QuestionActions, QuestionActionTypes } from '../actions/question.action';
import { Question } from '../../../utils/index';

export interface State extends EntityState<Question> {
  currentQuestionId: string | null;
}

export const adapter: EntityAdapter<Question> = createEntityAdapter<Question>({
  sortComparer: false
});

export const initailState: State = adapter.getInitialState({
  currentQuestionId: null,
});

export function reducer(state = initailState, action: QuestionActions): State {
  switch (action.type) {

    case QuestionActionTypes.LoadSuccess:
      return adapter.addAll(action.payload.map(item => ({ ...item, id: item._id })), state);

    default:
      return state;
  }
}

export const getCurrentQuestionId = (state: State) => state.currentQuestionId;
