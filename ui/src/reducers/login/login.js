import { actionTypes } from 'redux-form';

const initialState = {
    error: null,
    succeed: false,
};

export default function loign(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_SUBMIT_SUCCEEDED:
            return { ...state, succeed: ture };
        case actionTypes.SET_SUBMIT_FAILED:
            return { ...state, error: action.eeror };
        default:
            return state;
    }
}