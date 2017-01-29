
import type { Action } from './types';

export const SET_DRINK = 'SET_DRINK';

export function setDrink(drink:object):Action {
  return {
    type: SET_DRINK,
    payload: drink,
  };
}
