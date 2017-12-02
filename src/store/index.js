import { combineReducers } from 'redux';
import user from './user';

export const actions = {
    user: user.actions,
};

export const reducers = combineReducers({
    user: user.reducers,
});