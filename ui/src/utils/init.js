import axios from 'axios';

import {ajaxError} from '~/actions/common';


export default (dispatch) =>{
    axios.defaults.responseType = 'json';
    axios.interceptors.request.use((conig) =>{
        if(!(config.data && config.data.headers && config.data.headers['csrf-token'])){
            config.headers['csrf-token'] = document.querySelector('meta[name=csrf-token]').getAttribute('content');
        }
        return config;
    });

    axios.interceptors.response.use(
        res => res,
        (error) => {
            dispatch(ajaxError(error));
            return Promise.reject(error);
        },
    );
};