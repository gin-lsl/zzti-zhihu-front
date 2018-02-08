import * as userAction from '../actions/user.action';

export interface State {
  id: string;
  username: string;
  email: string;
}

const initialState: State = {
  id: null,
  username: null,
  email: null,
};

export function reducer(state = initialState, action: userAction.UserActions): State {
  switch (action.type) {
    case userAction.UserActionTypesEnum.LoadSuccess: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
}
