'use strict';

import {
    combineReducers
} from 'redux';

import auth from './Auth';
import user from './User';
import ui from './UI'
import app from './App';
import menu from './Menu';
import {
    routerReducer
} from 'react-router-redux';

const GenNextApp = combineReducers({
    auth,
    user,
    menu,
    ui,
    app,
    routing: routerReducer,
});

const rootReducer = (state, action) => {

    if (action.type === 'REDUX_RESET_STATE') {
        const {
            routing
        } = state
        state = {
            routing
        }
    }
    return GenNextApp(state, action);
}

export default rootReducer;
