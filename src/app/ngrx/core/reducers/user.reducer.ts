import * as userAction from '../actions/user.action';
import { User } from '../../../utils/index';

export interface State {
  signedIn: boolean;
  user: any | null;
  loadFailureError: any;
  postedQuestionsSort: 'NEWER_TO_OLDER' | 'OLDER_TO_NEWER' | 'AGREE';
  postedRepliesSort: 'NEWER_TO_OLDER' | 'OLDER_TO_NEWER' | 'AGREE';
}

const initialState: State = {
  signedIn: false,
  user: null,
  loadFailureError: null,
  postedQuestionsSort: 'NEWER_TO_OLDER',
  postedRepliesSort: 'NEWER_TO_OLDER',
};

export function reducer(state = initialState, action: userAction.UserActions): State {
  switch (action.type) {
    case userAction.UserActionTypesEnum.SignSuccess:
      return {
        ...state,
        signedIn: true,
        user: action.payload
      };

    case userAction.UserActionTypesEnum.SignOut:
      return initialState;

    case userAction.UserActionTypesEnum.LoadSuccess:
      return { ...state, user: { ...action.payload } };

    case userAction.UserActionTypesEnum.LoadFailure:
      return { ...initialState, loadFailureError: action.payload };

    case userAction.UserActionTypesEnum.ChangePostedQuestionsSort:
      return {
        ...state,
        postedQuestionsSort: action.payload,
      };

    case userAction.UserActionTypesEnum.ChangePostedRepliesSort:
      return {
        ...state,
        postedRepliesSort: action.payload,
      };

    case userAction.UserActionTypesEnum.FollowSuccess:
      return {
        ...state,
        user: {
          ...state.user,
          base: {
            ...state.user.base,
            followHimIds: [...(state.user.base.followHimIds) || [], action.payload.currentUserId]
          },
        },
        postedQuestionsSort: state.postedQuestionsSort,
      };

    case userAction.UserActionTypesEnum.CancelFollowSuccess:
      return {
        ...state,
        user: {
          ...state.user,
          base: {
            ...state.user.base,
            followHimIds: state.user.base.followHimIds ? state.user.base.followHimIds.filter(p => p !== action.payload.currentUserId) : [],
          }
        }
      };

    default: {
      return state;
    }
  }
}

export const getSignedIn = (state: State) => state.signedIn;
export const getUser = (state: State) => state.user;
