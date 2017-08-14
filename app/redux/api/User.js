'use strict';

import * as Action from 'app/redux/actions';
import axios from 'axios';
import StorageAPI from 'app/redux/api/Storage';

export default {
	updatePassword(values) {
		return dispatch => {
			console.log(values);
			setTimeout( () => {
				dispatch( Action.uiProcessingChangeUpdatePassword(false) );
				StorageAPI.user.setHasPassword(true);
			}, 1000);
			setTimeout( () => {
				dispatch( Action.uiModalsChangeUpdatePassword(false) );
			}, 1500);
		}
	},
}

