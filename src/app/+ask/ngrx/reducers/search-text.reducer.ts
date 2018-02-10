import * as askAction from '../actions/search-text.action';

export interface State {
  searchText: string | null;
}

const initialState: State = {
  searchText: null,
};

export function reducer(state = initialState, action: askAction.SearchTextActions): State {
  switch (action.type) {
    case askAction.SearchTextActionTypesEnum.SearchTextChange: {
      return {
        ...state,
        searchText: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
