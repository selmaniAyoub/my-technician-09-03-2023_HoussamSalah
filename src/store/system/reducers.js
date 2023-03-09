import { UPDATE_SESSION } from './types';

const initialState = {
    verified: false,
    loggedIn: false,
    user: {},
    success: false,
    error: false,
    message: ""
}

export function systemReducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case UPDATE_SESSION :{
            return {
                ...state,
                ...action.payload
            };
        }
        default:
            return state;
    }
}