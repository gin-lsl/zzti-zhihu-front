import * as userAction from '../actions/user.action';
import { User } from '../../../utils/index';

export interface State {
  signedIn: boolean;
  user: User | null;
  loadFailureError: any;
  postedSort: 'NEWER_TO_OLDER' | 'OLDER_TO_NEWER' | 'AGREE';
}

const initialState: State = {
  signedIn: false,
  user: null,
  loadFailureError: null,
  postedSort: 'NEWER_TO_OLDER',
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

    case userAction.UserActionTypesEnum.ChangePostedSort:
      return {
        ...state,
        postedSort: action.payload,
      };

    default: {
      return state;
    }
  }
}

export const getSignedIn = (state: State) => state.signedIn;
export const getUser = (state: State) => state.user;
