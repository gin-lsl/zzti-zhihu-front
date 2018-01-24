import { UserActions, UserActionTypesEnum } from '../actions/user.action';
import { User } from '../../../utils/index';

export interface State {
  signedIn: boolean;
  user: User | null;
  loadFailureError: any;
}

const initialState: State = {
  signedIn: false,
  user: null,
  loadFailureError: null,
};

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypesEnum.SignSuccess:
      return {
        ...state,
        signedIn: true,
        user: action.payload
      };

    case UserActionTypesEnum.SignOut:
      return initialState;

    case UserActionTypesEnum.LoadSuccess:
      return { ...state, user: { ...action.payload } };

    case UserActionTypesEnum.LoadFailure:
      return { ...initialState, loadFailureError: action.payload };

    default: {
      return state;
    }
  }
}

export const getSignedIn = (state: State) => state.signedIn;
export const getUser = (state: State) => state.user;
