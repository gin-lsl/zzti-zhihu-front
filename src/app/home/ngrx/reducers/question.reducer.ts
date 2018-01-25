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

    case QuestionActionTypes.UpSuccess: {
      const id = action.payload.questionId;
      return adapter.updateOne({
        id,
        changes: {
          upUsersId: [
            ...state.entities[id].upUsersId,
            action.payload.userId
          ]
        }
      }, state);
    }

    case QuestionActionTypes.CancelUpSuccess: {
      const id = action.payload.questionId;
      const userId = action.payload.userId;
      return adapter.updateOne({
        id,
        changes: {
          upUsersId: state.entities[id].upUsersId.filter(_ => _ !== userId)
        }
      }, state);
    }

    default:
      return state;
  }
}

export const getCurrentQuestionId = (state: State) => state.currentQuestionId;
