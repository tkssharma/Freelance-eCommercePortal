'use strict';

import config from 'app/global/config/server';
import axios from 'axios';

export function url(resource) {
    if (!resource) {
        return `${config.url}`
    }
    console.log(`${config.url}${config[resource]}`);
    return `${config.url}${config[resource]}`
}
export function setAuthToken(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}
export function setGeoLocation(location) {
    if (location) {
        axios.defaults.headers.common['Location'] = `${location.lng},${location.lat}`;
    } else {
        delete axios.defaults.headers.common['Location'];
    }
}
export function getAuthToken() {
    return localStorage.token;
}