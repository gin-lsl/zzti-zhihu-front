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

export const selectAuthStatusState = cs(selectCoreModuleState, (state: CoreState) => state.auth);

export const getSignedIn = cs(selectAuthStatusState, fromAuth.getSignedIn);

export const getLogedUser = cs(selectAuthStatusState, fromAuth.getUser);

export const getSignOnError = cs(selectAuthStatusState, fromAuth.getSignOnError);

export const getSignInError = cs(selectAuthStatusState, fromAuth.getSignInError);
