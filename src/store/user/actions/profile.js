export const USER___PROFILE__GET_CURRENT = 'USER___PROFILE__GET_CURRENT';
export const USER___PROFILE__SET = 'USER___PROFILE__SET';
export const USER___PROFILE__RESET = 'USER___PROFILE__RESET';


export const getCurrentProfile = () => ({
    type: USER___PROFILE__GET_CURRENT,
});

export const setProfile = (profileData) => ({
    type: USER___PROFILE__SET,
    profileData
});

export const resetProfile = () => ({
    type: USER___PROFILE__RESET,
});


export const actions = {
    setProfile,
    resetProfile,
    getCurrentProfile,
};

export default {
    actions,

    USER___PROFILE__SET,
    USER___PROFILE__GET_CURRENT,
    USER___PROFILE__RESET,
}