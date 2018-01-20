import { AuthActions, AuthActionTypes } from '../actions/auth.action';
import { User, API, ISignIn, ResponseError } from '../../../utils/index';

export interface State {
  signedIn: boolean;
  user: User | ISignIn | null;
  activeKey: string | null;
  signInError: ResponseError | null;
  signOnError: ResponseError | null;
}

const initialState: State = {
  signedIn: false,
  user: null,
  activeKey: null,
  signInError: null,
  signOnError: null,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.SignInSuccess:
      return {
        ...state,
        signedIn: true,
        user: action.payload,
        activeKey: null,
        signInError: null,
        signOnError: null,
      };

    case AuthActionTypes.SignInFailure:
      return {
        ...initialState,
        signInError: { ...action.payload },
      };

    case AuthActionTypes.SignOnSuccess:
      return {
        ...state,
        activeKey: action.payload,
      };

    case AuthActionTypes.SignOnFailure:
      console.log('SignOnFailure: ', action.payload);
      return {
        ...state,
        signOnError: { ...action.payload }
      };

    case AuthActionTypes.SignOut:
      return initialState;

    default: {
      return state;
    }
  }
}

export const getSignedIn = (state: State) => state.signedIn;
export const getUser = (state: State) => state.user;
export const getSignOnError = (state: State) => state.signOnError;
export const getSignInError = (state: State) => state.signInError;
