
import type { Action } from '../actions/types';
import { SET_DRINK } from '../actions/drink';

export type State = {
  drink: object
}

const initialState = {
  drink: {},
};

export default function (state:State = initialState, action:Action): State {

  if (action.type === SET_DRINK) {
    return {
      ...state,
      drink: action.payload,
    };
  }
  return state;
}
