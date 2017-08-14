'use strict';

import {
    USER_PROFILE_LOADED,
    USER_UPDATE_PROFILE,
    USER_UPDATE_PROFILE_FIELD,
    USER_DELETE_PROFILE_FIELD,

    USER_CREATE_REGISTRATION_MANY,
    USER_CREATE_REGISTRATION,
    USER_UPDATE_REGISTRATION_GUEST_DATA,
    USER_UPDATE_REGISTRATION_FIELD
} from 'app/redux/constants';

import Immutable from 'immutable';

const user_default_data = Immutable.Map({
    loded: false,
    profile: Immutable.Map({}),
    registration: Immutable.List([]),
    messages: Immutable.List([])
});

function user(user = user_default_data, action) {

    if (action.type === USER_PROFILE_LOADED) {
        return user.set('loded', action.payload);
    }
    if (action.type === USER_UPDATE_PROFILE) {
        if (action.payload && action.payload.gender) {
            action.payload.gender = action
                .payload
                .gender
                .toString();
        }
        return user.set('profile', Immutable.fromJS({
            ...user
                .get('profile')
                .toObject(),
            ...action.payload
        }));
    }
    if (action.type === USER_UPDATE_PROFILE_FIELD) {
        return user.setIn([
            'profile', action.payload.key
        ], action.payload.value);
    }
    if (action.type === USER_DELETE_PROFILE_FIELD) {
        return user.deleteIn(['profile', action.payload]);
    }
    if (action.type === USER_CREATE_REGISTRATION_MANY) {
        return user.set('registration', Immutable.List(action.payload));
    } else if (action.type === USER_CREATE_REGISTRATION) {
        return user.set('registration', user.get('registration').push(action.payload));
    } else if (action.type === USER_UPDATE_REGISTRATION_GUEST_DATA) {
        let registrationIndex = user
            .get('registration')
            .findIndex(item => {
                return item.id == action.payload.booking;
            });
        let updatedRegistration = user
            .get('registration')
            .update(registrationIndex, (event) => {
                event.guests[action.payload.id][action.payload.field] = action.payload.value;
                return Object.assign({}, event);
            });
        return user.set('bookings', updatedRegistration);
    } else if (action.type === USER_UPDATE_REGISTRATION_FIELD) {
        let registrationIndex = user
            .get('registration')
            .findIndex(item => {
                return item.id == action.payload.booking;
            });
        let updatedRegistration = user
            .get('registration')
            .update(registrationIndex, (event) => {
                event[action.payload.field] = action.payload.value;
                return Object.assign({}, event);
            });
        return user.set('registration', updatedRegistration);
    } else {
        return user;
    }

}

export default user;
