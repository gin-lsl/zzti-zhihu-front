import * as askAction from '../actions/ask.action';

export interface State {
  title: string | null;
  description: string | null;
  tags: Array<string> | null;
  isAnonymous: boolean | null;
  hasOld: boolean;
}

const initialState: State = {
  title: null,
  description: null,
  tags: [],
  isAnonymous: false,
  hasOld: false
};

export function reducer(state = initialState, action: askAction.AskActions): State {
  switch (action.type) {
    // 发送失败, 需要把问题信息
    case askAction.AskActionTypesEnum.PostFailure: {
      return {
        ...state,
        ...action.payload,
        hasOld: true,
      };
    }

    case askAction.AskActionTypesEnum.PostSuccess:
      console.log('PostSuccess: ', action);
      return {
        title: null,
        description: null,
        tags: [],
        isAnonymous: false,
        hasOld: false,
      };

    default: {
      return state;
    }
  }
}

export const getHasOld = (state: State) => state.hasOld;
