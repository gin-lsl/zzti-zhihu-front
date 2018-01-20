import { UserActions, UserActionTypes } from '../actions/user.action';
import { User } from '../../../utils/index';

export interface State {
  signedIn: boolean;
  user: User | null;
}

const initialState: State = {
  signedIn: false,
  user: null,
};

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.SignSuccess:
      return {
        ...state,
        signedIn: true,
        user: action.payload
      };
    case UserActionTypes.SignOut:
      return initialState;

    default: {
      return state;
    }
  }
}

export const getSignedIn = (state: State) => state.signedIn;
export const getUser = (state: State) => state.user;
