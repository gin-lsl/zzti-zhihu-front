import {
  createFeatureSelector as cfs,
  createSelector as cs,
  ActionReducerMap
} from '@ngrx/store';
import * as fromRoot from '../../../ngrx/root/reducers/index';
import * as fromSearchText from './search-text.reducer';
import * as fromSearchResult from './search-result.reducer';
import * as fromAsk from './ask.reducer';

export interface AskModuleState {
  searchText: fromSearchText.State;
  searchResults: fromSearchResult.State;
  ask: fromAsk.State;
}

export interface State extends fromRoot.State {
  askModule: AskModuleState;
}

export const reducers: ActionReducerMap<AskModuleState> = {
  searchText: fromSearchText.reducer,
  searchResults: fromSearchResult.reducer,
  ask: fromAsk.reducer,
};

export const selectAskModuleState = cfs<AskModuleState>('askModule');

export const selectSearchTextState = cs(selectAskModuleState, state => state.searchText);

export const selectSearchResultsState = cs(selectAskModuleState, state => state.searchResults);

export const selectAskState = cs(selectAskModuleState, state => state.ask);

export const {
  selectAll: getAllSearchResult,
} = fromSearchResult.adapter.getSelectors(selectSearchResultsState);

// export const getSignedIn = cs(selectAuthState, fromAuth.getSignedIn);

// export const getLogedUser = cs(selectAuthState, fromAuth.getUser);

// export const getSignOnError = cs(selectAuthState, fromAuth.getSignOnError);

// export const getSignInError = cs(selectAuthState, fromAuth.getSignInError);

// export const getUser = cs(seelctUserState, fromUser.getUser);

export const getHasOldAsk = cs(selectAskState, fromAsk.getHasOld);
