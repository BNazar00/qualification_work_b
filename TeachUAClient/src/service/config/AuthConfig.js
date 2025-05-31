import { BASE_URL } from "./ApiConfig"

export const OAUTH2_REDIRECT_URI = BASE_URL + '/oauth2/redirect';

export const GOOGLE_AUTH_URL = BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;

export const FACEBOOK_AUTH_URL = BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;