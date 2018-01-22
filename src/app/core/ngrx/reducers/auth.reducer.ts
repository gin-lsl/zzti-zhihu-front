import { AuthActions, AuthActionTypes } from '../actions/auth.action';
import { User, API, ISignIn, ResponseError } from '../../../utils/index';
import { cacheUserStorage, parseUserStorage, clearUserStorage } from '../../../utils/functions/localstorage.function';

export interface State {
  signedIn: boolean;
  user: User | ISignIn | null;
  activeKey: string | null;
  signInError: ResponseError | null;
  signOnError: ResponseError | null;
}

const initialState: State = {
  signedIn: false,
  user: parseUserStorage(),
  activeKey: null,
  signInError: null,
  signOnError: null,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {

    case AuthActionTypes.AuthInitial:
      return { ...initialState };

    case AuthActionTypes.SignInSuccess:

      cacheUserStorage(action.payload);
      return {
        ...state,
        signedIn: true,
        user: { ...action.payload },
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
      return {
        ...state,
        signOnError: { ...action.payload }
      };

    case AuthActionTypes.SignOut:
      return initialState;

    case AuthActionTypes.LoadUserInformationSuccess:
      return {
        ...state,
        user: { ...action.payload },
      };

    case AuthActionTypes.LoadUserInformationFailure:
      clearUserStorage();
      return initialState;

    default: {
      return state;
    }
  }
}

export const getSignedIn = (state: State) => state.signedIn;
export const getUser = (state: State) => state.user;
export const getActiveKey = (state: State) => state.activeKey;
export const getSignOnError = (state: State) => state.signOnError;
export const getSignInError = (state: State) => state.signInError;
