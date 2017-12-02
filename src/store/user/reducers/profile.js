import update from 'immutability-helper';


import { profile } from '../actions';


const initialState = {
    isLoading: false,
    isAuthorized: false,
    isError: false,
    isLoaded: false,
    profileData: {},
};

const actionsMap = {
    [profile.USER___PROFILE__GET_CURRENT]: (state, action) => {
        return update(state, {
            isLoading: { $set: true }
        });
    },

    [profile.USER___PROFILE__SET]: (state, { profileData }) => {
        return update(state, {
            isLoading: { $set: false },
            isLoaded: { $set: true },
            isAuthorized: { $set: true },
            isError: { $set: false },
            profileData: { $set: profileData }
        });
    },

    [profile.USER___PROFILE__RESET]: (state, action) => {
        return initialState;
    },
};

export default (state = initialState, action = {}) => {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
}
