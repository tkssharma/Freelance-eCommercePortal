'use strict';
// data.keySeq().toArray()

import {
	REDUX_RESET_STATE,
	AUTH_UPDATE_REGISTER_FORM_FIELD,
	AUTH_SUBMIT_REGISTER_FORM,
	AUTH_INVALIDATE_REGISTER_FORM,
	AUTH_RESET_REGISTER_FORM_FIELDS,
	AUTH_UPDATE_USER_DATA,
	AUTH_RESET_USER_DATA,
	AUTH_UPDATE_USER_FIELD,
	AUTH_UPDATE_LOGIN_FORM_FIELD,
	AUTH_SUBMIT_LOGIN_FORM,
	AUTH_INVALIDATE_LOGIN_FORM,
	AUTH_RESET_LOGIN_FORM_FIELDS,

	AUTH_SUBMIT_RESET_PASSWORD_FORM,
	AUTH_UPDATE_RESET_PASSWORD_STATUS_FIELD,
	AUTH_INVALIDATE_RESET_PASSWORD_FORM,

	APP_CONFIG_TOGGLE_ASIDE,

	USER_UPDATE_PROFILE,
	USER_UPDATE_PROFILE_FIELD,
	USER_DELETE_PROFILE_FIELD,
	USER_PROFILE_LOADED,

	UI_PROCESSING_UPDATE_FIELD,
	UI_MODALS_UPDATE_FIELD,
	UI_LOADED_UPDATE_FIELD,

	TRAINER_CREATE_TRAINING_MANY,
	TRAINER_CREATE_TRAINING,
	TRAINER_UPDATE_TRAINING,
	TRAINER_DELETE_TRAINING_FIELD,

	TRAINER_UPDATE_TRAINING_SECTION,
	TRAINER_CREATE_TRAINING_ACTION,
	TRAINER_UPDATE_TRAINING_ACTION,
	TRAINER_CREATE_TRAINING_ACTION_MANY,

	TRAINER_CREATE_WEBINAR_MANY,
	TRAINER_CREATE_WEBINAR,
	TRAINER_UPDATE_WEBINAR,

	USER_CREATE_REGISTRATION_MANY,
	USER_CREATE_REGISTRATION,
	USER_UPDATE_REGISTRATION_GUEST_DATA,
	USER_UPDATE_REGISTRATION_FIELD,
	ADMIN_GET_ALL_MENU,
	ADMIN_GET_ALL_MENU_SUCCESS,
	ADMIN_UPDATE_NAVPATH
} from 'app/redux/constants';

import axios from 'axios';
import * as API from 'app/api';
import {message, notification} from 'antd';
import {browserHistory} from 'react-router';
import Auth from 'app/redux/api/Auth';
import StorageAPI from 'app/redux/api/Storage';
import jwt from 'jsonwebtoken';

import routes from 'app/redux/constants/Routes';

export function updateNavPath(path, key) {
	return {
		type: ADMIN_UPDATE_NAVPATH,
		payload: {
			data: path,
			key: key
		}
	}
}

export function getAllMenuSuccess(data){
	return {
		type: ADMIN_GET_ALL_MENU_SUCCESS,
		payload: {
			data: data
		}
	}
}

export function getAllMenu() {

	return dispatch => {

		return axios.get(API.url('adminMenu')).then((response) => {
			let json = response.data;
			dispatch(getAllMenuSuccess(json));
		}).catch((error) => {
			dispatch(getAllMenuSuccess({}));
			notification.warning({message: 'Error Occoured', description: error});
		});
	}
}

export function reduxResetState() {
	return {type: REDUX_RESET_STATE}
}
/*
Auth actions
*/

export function authUpdateRegisterFormField(data) {
	return {type: AUTH_UPDATE_REGISTER_FORM_FIELD, payload: data}
}
export function authSubmitRegisterForm(data) {
	return {type: AUTH_SUBMIT_REGISTER_FORM, payload: data}
}
export function authInvalidateRegisterForm(data) {
	return {type: AUTH_INVALIDATE_REGISTER_FORM, payload: data}
}
export function authResetRegisterFormFields() {
	return {type: AUTH_RESET_REGISTER_FORM_FIELDS}
}

export function authServerRegisterUser(data) {
	return dispatch => {

		let nofity_message = message.info('Creating your account...', 0);

		return axios.post(API.url('register'), data).then((response) => {
			let json = response.data;
			nofity_message();
			dispatch(authSubmitRegisterForm(false));

			if (json.message === 'error' || json.code != 200) {
				message.info('Error occoured while creating account.', 3);
				notification.warning({message: 'Error Occoured', description: json.error});
			} else {
				dispatch(authResetRegisterFormFields());
				message.info('Account successfully created. You can login now.', 3);
				browserHistory.push(routes.user_login);
			}

		}).catch((error) => {
			dispatch(authSubmitRegisterForm(false));
			notification.warning({message: 'Error Occoured', description: error});
		});

	}
}
export function authUpdateLoginFormField(data) {
	return {type: AUTH_UPDATE_LOGIN_FORM_FIELD, payload: data}
}
export function authSubmitLoginForm(status) {
	return {type: AUTH_SUBMIT_LOGIN_FORM, payload: status}
}
export function authInvalidateLoginForm(data) {
	return {type: AUTH_INVALIDATE_LOGIN_FORM, payload: data}
}

export function authResetLoginFormFields() {
	return {type: AUTH_RESET_LOGIN_FORM_FIELDS}
}

export function authUpdateUserData(data) {
	if (!data.hasPassword) {
		data.hasPassword = StorageAPI
		.user
		.getHasPassword();
	}
	if (data.userType == 1 && data.userType != StorageAPI.user.getUserType()) {
		data.userType = StorageAPI
		.user
		.getUserType();
	}
	return {type: AUTH_UPDATE_USER_DATA, payload: data}
}

export function authUpdateUserField(data) {
	return {type: AUTH_UPDATE_USER_FIELD, payload: data}
}

export function authResetUserData() {
	return {type: AUTH_RESET_USER_DATA}
}

export function authServerLoginUser(data) {
	return dispatch => {

		let nofity_message = message.info('Logging you in.. please wait', 0);

		return axios.post(API.url('login'), data).then((response) => {
			let json = response.data;
			nofity_message();
			dispatch(authSubmitLoginForm(false));

			if (json.message === 'error' || json.code != 200) {
				message.info('Error occoured while logging you in.', 3);
				notification.warning({
					message: 'Error Occoured',
					description: JSON.stringify(json.error, null, 2)
				});
			} else {
				dispatch(authResetLoginFormFields());
				message.info('Successfully logged in', 3);
				Auth.setAccessToken(json.token);
				API.setAuthToken(json.token);
				dispatch(authUpdateUserData(jwt.decode(json.token)));
				if (sessionStorage.redirect_after_login) {
					browserHistory.push(sessionStorage.redirect_after_login);
				} else {
					browserHistory.push(routes.user_dashboard);
				}
			}

		}).catch((error) => {
			nofity_message();
			dispatch(authSubmitLoginForm(false));
			notification.warning({message: 'Error Occoured', description: "Error occoured while connecting to server, Please try again after some time."});
		});
	}
}

export function authSubmitResetPasswordForm(status) {
	return {type: AUTH_SUBMIT_RESET_PASSWORD_FORM, payload: status}
}
export function authUpdateResetPasswordStatusField(data) {
	return {type: AUTH_UPDATE_RESET_PASSWORD_STATUS_FIELD, payload: data}
}

export function authInvalidateResetPasswordForm(data) {
	return {type: AUTH_INVALIDATE_RESET_PASSWORD_FORM, payload: data}
}

export function authServerResetPassword(data) {
	return dispatch => {

		return axios.post(API.url('reset_password'), data).then((response) => {
			let json = response.data;
			dispatch(authSubmitResetPasswordForm(false));

			if (json.message === 'error' || json.code != 200) {
				message.info('Error occoured while resetting your password.', 2);
				notification.warning({message: 'Error Occoured', description: json.description});
			} else {
				message.info('Password reset request was successful.', 3);
				dispatch(authUpdateResetPasswordStatusField({field: 'done', value: true}));
			}

		}).catch((response) => {
			dispatch(authSubmitResetPasswordForm(false));
			dispatch(authUpdateResetPasswordStatusField({field: 'error', value: true}));
		});

	}
}

export function userProfileLoaded(data) {
	return {type: USER_PROFILE_LOADED, payload: data}
}

export function userUpdateProfile(data) {
	return {type: USER_UPDATE_PROFILE, payload: data}
}

export function userUpdateProfileField(data) {
	return {type: USER_UPDATE_PROFILE_FIELD, payload: data}
}

export function userDeleteProfileField(data) {
	return {type: USER_DELETE_PROFILE_FIELD, payload: data}
}

export function appConfigToggleAside(data) {
	return {type: APP_CONFIG_TOGGLE_ASIDE, payload: data}
}

export function uiProcessingUpdateField(data) {
	return {type: UI_PROCESSING_UPDATE_FIELD, payload: data}
}

export function uiModalsUpdateField(data) {
	return {type: UI_MODALS_UPDATE_FIELD, payload: data}
}

export function uiLoadedUpdateField(data) {
	return {type: UI_LOADED_UPDATE_FIELD, payload: data}
}
