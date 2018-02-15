import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as replyAction from '../actions/reply.action';
import { Reply } from '../../../utils/index';

export interface State extends EntityState<Reply> {
  currrentReplyId: string | null;
}

export const adapter: EntityAdapter<Reply> = createEntityAdapter({
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  currrentReplyId: null,
});

export function reducer(state = initialState, action: replyAction.ReplyActions): State {
  switch (action.type) {
    case replyAction.ReplyActionTypesEnum.LoadSuccess:
      return {
        ...adapter.addMany(action.payload.replies, state),
        currrentReplyId: action.payload.id,
      };

    case replyAction.ReplyActionTypesEnum.PostSuccess:
      return {
        ...adapter.addOne(action.payload, state),
        currrentReplyId: state.currrentReplyId,
      };

    default: {
      return state;
    }
  }
}

export const getCurrentReplyId = (state: State) => state.currrentReplyId;
