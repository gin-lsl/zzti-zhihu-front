import * as authAction from '../actions/auth.action';
import { User, API, ISignIn, ResponseError, API_HOST } from '../../../utils/index';
import { cacheUserStorage, parseUserStorage, clearUserStorage } from '../../../utils/functions/localstorage.function';

export interface State {
  signedIn: boolean;
  user: User | ISignIn | null | any;
  activeKey: string | null;
  signInError: ResponseError | null;
  signOnError: ResponseError | null;
}

const initialState: State = {
  signedIn: false,
  user: parseUserStorage() || {},
  activeKey: null,
  signInError: null,
  signOnError: null,
};

export function reducer(state = initialState, action: authAction.AuthActions): State {
  switch (action.type) {

    case authAction.AuthActionTypesEnum.LoadSuccess:
      return {
        ...state, user: {
          ...action.payload,
          base: {
            ...action.payload.base,
            avatar: API_HOST + '/users/avatar/' + action.payload.base.avatar,
          }
        }
      };

    case authAction.AuthActionTypesEnum.AuthInitial:
      return { ...initialState };

    case authAction.AuthActionTypesEnum.ClearLogedUserStateSuccess:
      return { ...state, user: {} };

    case authAction.AuthActionTypesEnum.SignInSuccess:
      cacheUserStorage(action.payload);
      return {
        ...state,
        signedIn: true,
        user: { ...action.payload },
        activeKey: null,
        signInError: null,
        signOnError: null,
      };

    case authAction.AuthActionTypesEnum.SignInFailure:
      return {
        ...initialState,
        signInError: { ...action.payload },
      };

    case authAction.AuthActionTypesEnum.SignOnSuccess:
      return {
        ...state,
        activeKey: action.payload,
        signOnError: null,
      };

    case authAction.AuthActionTypesEnum.SignOnFailure:
      return {
        ...state,
        signOnError: { ...action.payload }
      };

    case authAction.AuthActionTypesEnum.SignOut:
      return initialState;

    case authAction.AuthActionTypesEnum.LoadUserInformationSuccess:
      // console.log('====================: ', action.payload);
      const { id, email, username } = action.payload.base;
      let avatar = action.payload.base.avatar;
      if (avatar) {
        avatar = API_HOST + '/users/avatar/' + avatar;
      }
      return {
        ...state,
        user: { id, email, username, avatar },
      };

    case authAction.AuthActionTypesEnum.LoadUserInformationFailure:
      // clearUserStorage();
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
