import {
  createFeatureSelector as cfs,
  createSelector as cs,
  ActionReducerMap
} from '@ngrx/store';
import * as fromRoot from '../../../ngrx/reducers/index';
import * as fromAuth from './auth.reducer';

export interface CoreState {
  auth: fromAuth.State;
}

export interface State extends fromRoot.State {
  auth: CoreState;
}

export const reducers: ActionReducerMap<CoreState> = {
  auth: fromAuth.reducer,
};

export const selectCoreState = cfs<CoreState>('core');

export const selectAuthStatusState = cs(
  selectCoreState,
  (state: CoreState) => state.auth
);

export const getSignedIn = cs(
  selectAuthStatusState,
  fromAuth.getSignedIn
);

export const getUser = cs(
  selectAuthStatusState,
  fromAuth.getUser
);

export const getSignOnError = cs(
  selectAuthStatusState,
  fromAuth.getSignOnError
);

export const getSignInError = cs(
  selectAuthStatusState,
  fromAuth.getSignInError
);
