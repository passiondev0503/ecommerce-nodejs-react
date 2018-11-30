import { push } from 'react-router-redux';
import api from 'lib/api';
import settings from 'lib/settings';
import * as t from './actionTypes'

const requestAuthorize = () => ({
  type: t.AUTHORIZE_REQUEST
});

const receiveAuthorize = (sent, error) => ({
  type: t.AUTHORIZE_RECEIVE,
  sent,
  error
});

const failureAuthorize = (error) => ({
  type: t.AUTHORIZE_FAILURE,
  error
});

export const authorize = (email) => {
  return (dispatch, getState) => {
    dispatch(requestAuthorize());
    return api.authorize(settings.apiBaseUrl, email).then(authorizeResponse => {
      dispatch(receiveAuthorize(authorizeResponse.json.sent, authorizeResponse.json.error));
    }).catch(error => {
      dispatch(failureAuthorize(error));
    });
  }
}
