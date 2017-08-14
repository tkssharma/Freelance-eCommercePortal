'use strict';

import {
    APP_CONFIG_TOGGLE_ASIDE,
} from 'app/redux/constants';

import Immutable from 'immutable';

const application_default_data = Immutable.Map({
    config: Immutable.Map({
        aside: Immutable.Map({
            visible: true
        }),
        links: Immutable.Map({
          user: Immutable.Map({
            dashboard: 'dashboard',
            account: 'account',
            bookings: 'Trainings',
            messages: 'messages',
          })
        })
    }),

    default: Immutable.Map({
        name: 'GenNext Training',
    }),

});

function app(app = application_default_data, action) {

    if (action.type === APP_CONFIG_TOGGLE_ASIDE) {
        return app.setIn(['config', 'aside', 'visible'], !app.get('config').get('aside').get('visible'));
    } else {
        return app;
    }
}
export default app;