import {
  createFeatureSelector as cfs,
  createSelector as cs,
  ActionReducerMap
} from '@ngrx/store';
import * as fromRoot from '../../../ngrx/reducers/index';
import * as fromSearchText from './search-text.reducer';
import * as fromSearchResult from './search-result.reducer';

export interface AskModuleState {
  searchText: fromSearchText.State;
  searchResults: fromSearchResult.State;
}

export interface State extends fromRoot.State {
  askModule: AskModuleState;
}

export const reducers: ActionReducerMap<AskModuleState> = {
  searchText: fromSearchText.reducer,
  searchResults: fromSearchResult.reducer,
};

export const selectAskModuleState = cfs<AskModuleState>('askModule');

export const selectSearchTextState = cs(selectAskModuleState, state => state.searchText);

export const seelctSearchResultsState = cs(selectAskModuleState, state => state.searchResults);

// export const getSignedIn = cs(selectAuthState, fromAuth.getSignedIn);

// export const getLogedUser = cs(selectAuthState, fromAuth.getUser);

// export const getSignOnError = cs(selectAuthState, fromAuth.getSignOnError);

// export const getSignInError = cs(selectAuthState, fromAuth.getSignInError);

// export const getUser = cs(seelctUserState, fromUser.getUser);
