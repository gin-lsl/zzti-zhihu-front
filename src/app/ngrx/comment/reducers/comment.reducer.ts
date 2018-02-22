import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as commentAction from '../actions/comment.action';
import { Comment } from '../../../utils/index';

export interface State extends EntityState<Comment> {
  currentCommentId: string | null;
}

export const adapter: EntityAdapter<Comment> = createEntityAdapter<Comment>({
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  currentCommentId: null,
});

export function reducer(state = initialState, action: commentAction.CommentActions): State {
  switch (action.type) {
    case commentAction.CommentActionTypesEnum.LoadSuccess:
      return {
        ...adapter.addMany(action.payload, state),
        currentCommentId: null,
      };

    case commentAction.CommentActionTypesEnum.PostSuccess:
      return {
        ...adapter.addOne(action.payload, state),
        currentCommentId: state.currentCommentId,
      };

    default: {
      return state;
    }
  }
}

export const getCurrentCommentId = (state: State) => state.currentCommentId;
