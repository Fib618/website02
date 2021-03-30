import {
    CLEAR_ERROR,
    ERR_AJAX,
} from '../actionTypes/common';


export const ajaxError = error => ({
    type: ERR_AJAX,
    error,
});

export const crearError = () => ({
    type: CLEAR_ERROR,
});