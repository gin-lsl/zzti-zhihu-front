import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { QuestionActions, QuestionActionTypesEnum } from '../actions/question.action';
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

    case QuestionActionTypesEnum.LoadSuccess:
      return {
        ...adapter.addAll(action.payload.map(item => ({ ...item, id: item._id })), state),
        currentQuestionId: null,
      };

    case QuestionActionTypesEnum.LoadOneSuccess:
      return {
        ...adapter.addOne(action.payload, state),
        currentQuestionId: action.payload.id,
      };

    case QuestionActionTypesEnum.UpSuccess: {
      const id = action.payload.questionId;
      return {
        ...adapter.updateOne({
          id,
          changes: {
            upUserIds: [
              ...state.entities[id].upUserIds,
              action.payload.userId
            ]
          }
        }, state),
      };
    }

    case QuestionActionTypesEnum.CancelUpSuccess: {
      const id = action.payload.questionId;
      const userId = action.payload.userId;
      return {
        ...adapter.updateOne({
          id,
          changes: {
            upUserIds: state.entities[id].upUserIds.filter(_ => _ !== userId)
          }
        }, state)
      };
    }

    case QuestionActionTypesEnum.DownSuccess: {
      const id = action.payload.questionId;
      return {
        ...adapter.updateOne({
          id,
          changes: {
            downUserIds: [
              ...state.entities[id].downUserIds,
              action.payload.userId
            ]
          }
        }, state)
      };
    }

    case QuestionActionTypesEnum.CancelDownSuccess: {
      const id = action.payload.questionId;
      const userId = action.payload.userId;
      return {
        ...adapter.updateOne({
          id,
          changes: {
            downUserIds: state.entities[id].downUserIds.filter(_ => _ !== userId)
          }
        }, state)
      };
    }

    case QuestionActionTypesEnum.LikeSuccess: {
      const id = action.payload.questionId;
      const userId = action.payload.userId;
      return {
        ...adapter.updateOne({
          id,
          changes: {
            saveUserIds: [
              ...state.entities[id].saveUserIds,
              userId
            ]
          }
        }, state)
      };
    }

    case QuestionActionTypesEnum.UnLikeSuccess: {
      const id = action.payload.questionId;
      const userId = action.payload.userId;
      return {
        ...adapter.updateOne({
          id,
          changes: {
            saveUserIds: state.entities[id].saveUserIds.filter(_ => _ !== userId)
          }
        }, state)
      };
    }

    default:
      return state;
  }
}

export const getCurrentQuestionId = (state: State) => state.currentQuestionId;
