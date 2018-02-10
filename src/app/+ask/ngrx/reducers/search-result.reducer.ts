import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as searchResultAction from '../actions/search-result.action';
import { Question } from '../../../utils/index';

export interface State extends EntityState<Question> {
  error: any | null;
}

export const adapter = createEntityAdapter<Question>({
  selectId: (question: Question) => question.id,
  sortComparer: false
});

const initialState: State = adapter.getInitialState({
  error: null,
});

export function reducer(state = initialState, action: searchResultAction.SearchResultActions): State {
  switch (action.type) {
    case searchResultAction.SearchResultActionTypesEnum.LoadSuccess: {
      return {
        ...adapter.addAll(action.payload, state),
      };
    }

    default: {
      return state;
    }
  }
}
