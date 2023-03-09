import { DOCTORS_HOME_LIST } from './types';

const initialState = {
    success: false,
    error: false,
    message: "",
    technicians: []
}

export function getHomeTechniciansReducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case DOCTORS_HOME_LIST: {
            return {
                ...state,
                ...action.payload
            };
        }
        default:
            return state;
    }
}