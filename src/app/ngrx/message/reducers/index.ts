import {
  createFeatureSelector as cfs,
  createSelector as cs,
  ActionReducerMap
} from '@ngrx/store';
import * as fromMessage from './message.reducer';
import * as fromRoot from '../../root/reducers/index';

export interface MessageModuleState {
  messages: fromMessage.State;
}

export interface State extends fromRoot.State {
  messages: MessageModuleState;
}

export const reducers: ActionReducerMap<MessageModuleState> = {
  messages: fromMessage.reducer,
};

export const selectMessageState = cfs<MessageModuleState>('messageModule');

export const getMessageEntitiesState = cs(
  selectMessageState,
  state => state ? state.messages : null,
);

export const {
  selectIds: getMessageIds,
  selectEntities: getMessageEntities,
  selectAll: getAllMessages,
  selectTotal: getTotalMessages,
} = fromMessage.adapter.getSelectors(getMessageEntitiesState);

// const getAllMessagesByCurrentSignInUser = cs()
