import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../ngrx/reducers/index';
import * as fromAuth from '../reducers/auth.reducer';
import { ActionReducerMap } from '@ngrx/store/src/models';

export interface CoreState {
  auth: fromAuth.State;
}

export interface State extends fromRoot.State {
  auth: CoreState;
}

export const reducers: ActionReducerMap<CoreState> = {
  auth: fromAuth.reducer,
};

export const selectCoreState = createFeatureSelector<CoreState>('core');

export const selectAuthStatusState = createSelector(selectCoreState, (state: CoreState) => {
  console.log('------------------AuthState: ', state);
  return state.auth;
});

export const getSignedIn = createSelector(selectAuthStatusState, fromAuth.getSignedIn);

export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);

export const getSignOnError = createSelector(selectAuthStatusState, fromAuth.getSignOnError);

export const getSignInError = createSelector(selectAuthStatusState, fromAuth.getSignInError);
