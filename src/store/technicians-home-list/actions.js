import { DOCTORS_HOME_LIST } from './types';

export function getHomeTechnicians(data) {
    return {
      type: DOCTORS_HOME_LIST,
      payload: data
    };
}