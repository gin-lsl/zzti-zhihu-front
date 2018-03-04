import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { QuestionActions, QuestionActionTypesEnum } from '../actions/question.action';
import { Question, API_HOST } from '../../../utils/index';

export interface State extends EntityState<Question> {
  currentQuestionId: string | null;
  relates: Array<any> | null;
  sort: 'NEWER_TO_OLDER' | 'OLDER_TO_NEWER';
  searchResults: Array<any> | null;
  searchBoxFocus: boolean;
}

export const adapter: EntityAdapter<Question> = createEntityAdapter<Question>({
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  currentQuestionId: null,
  relates: [],
  sort: 'NEWER_TO_OLDER',
  searchResults: [],
  searchBoxFocus: false,
}) as State;

export function reducer(state = initialState, action: QuestionActions): State {
  switch (action.type) {

    case QuestionActionTypesEnum.LoadSuccess:
      return {
        ...adapter.addMany(action.payload.map(q => ({
          ...q,
          user: {
            ...q.user,
            avatar: API_HOST + '/users/avatar/' + q.user.avatar,
          }
        })), state),
        currentQuestionId: null,
      };

    case QuestionActionTypesEnum.LoadOneSuccess: {
      if ((state.ids as string[]).includes(action.payload.id)) {
        return {
          ...adapter.updateOne({
            ...action.payload,
            user: {
              ...action.payload.user,
              avatar: API_HOST + '/users/avatar/' + action.payload.user.avatar,
            }
          }, state),
          currentQuestionId: action.payload.id,
        };
      }
      return {
        ...adapter.addOne({
          ...action.payload,
          user: {
            ...action.payload.user,
            avatar: API_HOST + '/users/avatar/' + action.payload.user.avatar,
          }
        }, state),
        currentQuestionId: action.payload.id,
      };
    }

    case QuestionActionTypesEnum.LoadRelatesSuccess:
      return {
        ...state,
        relates: action.payload
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

    case QuestionActionTypesEnum.SearchSuccess: {
      return {
        ...state,
        searchResults: action.payload,
      };
    }

    case QuestionActionTypesEnum.SearchBoxFocusChange:
      return {
        ...state,
        searchBoxFocus: action.payload,
      };

    case QuestionActionTypesEnum.ChangeSort:
      return {
        ...state,
        sort: action.payload,
      };

    default:
      return state;
  }
}

export const getCurrentQuestionId = (state: State) => state.currentQuestionId;
export const getRelates = (state: State) => state.relates;
