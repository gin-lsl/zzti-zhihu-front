import * as messageAction from '../actions/message.action';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Message } from '../../../utils';

export interface State extends EntityState<Message> {
  currentMessageId: string | null;
}

export const adapter: EntityAdapter<Message> = createEntityAdapter<Message>({
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  currentMessageId: null,
});

export function reducer(state = initialState, action: messageAction.MessageActions): State {
  switch (action.type) {
    case messageAction.MessageActionTypesEnum.LoadSuccess: {
      return {
        ...adapter.addAll(action.payload.map(m => ({
          ...m,
        })), state),
        currentMessageId: null,
      };
    }

    case messageAction.MessageActionTypesEnum.RemoveSuccess:
      return adapter.removeOne(action.payload, state);

    case messageAction.MessageActionTypesEnum.ClearSuccess:
      return adapter.removeAll(state);

    default: {
      return state;
    }
  }
}

export const getCurrentMessageId = (state: State) => state.currentMessageId;
