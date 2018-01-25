import {
  createFeatureSelector as cfs,
  createSelector as cs,
  ActionReducerMap
} from '@ngrx/store';
import * as fromRoot from '../../../ngrx/reducers/index';
import * as fromAuth from './auth.reducer';
import * as fromUser from './user.reducer';

export interface CoreState {
  auth: fromAuth.State;
  user: fromUser.State;
}

export interface State extends fromRoot.State {
  coreModule: CoreState;
}

export const reducers: ActionReducerMap<CoreState> = {
  auth: fromAuth.reducer,
  user: fromUser.reducer,
};

export const selectCoreModuleState = cfs<CoreState>('coreModule');

export const selectAuthState = cs(selectCoreModuleState, state => state.auth);

export const seelctUserState = cs(selectCoreModuleState, state => state.user);

export const getSignedIn = cs(selectAuthState, fromAuth.getSignedIn);

export const getLogedUser = cs(selectAuthState, fromAuth.getUser);

export const getSignOnError = cs(selectAuthState, fromAuth.getSignOnError);

export const getSignInError = cs(selectAuthState, fromAuth.getSignInError);

export const getUser = cs(seelctUserState, fromUser.getUser);
