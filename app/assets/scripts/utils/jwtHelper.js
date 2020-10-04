import decode from 'jwt-decode';

export function getTokenExpirationDate (token) {
  const decoded = decode(token);

  if (!decoded.exp) {
    return null;
  }

  const date = new Date(0);
  date.setUTCSeconds(decoded.exp);

  return date;
}

export function isTokenExpired (token) {
  const date = getTokenExpirationDate(token);
  const offsetSeconds = 0;
  if (date === null) {
    return false;
  }

  return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
}

export function isInternationalEditor (token) {
  const decoded = decode(token);
  return decoded.roles && decoded.roles.indexOf('international editor') > -1;
}
export function isNationalEditor (token) {
  const decoded = decode(token);
  return decoded.roles && decoded.roles.indexOf('national editor') > -1;
}
export function isInternationalReviewer (token) {
  const decoded = decode(token);
  return decoded.roles && decoded.roles.indexOf('international reviewer') > -1;
}
export function isNationalReviewer (token) {
  const decoded = decode(token);
  return decoded.roles && decoded.roles.indexOf('national reviewer') > -1;
}
export function isEditor (token) {
  return isInternationalEditor(token) || isNationalEditor(token) || isIndicatorEditor(token);
}
export function isIndicatorEditor (token) {
  const decoded = decode(token);
  return decoded.roles && decoded.roles.indexOf('indicator editor') > -1;
}
export function isIndicatorReviewer (token) {
  const decoded = decode(token);
  return decoded.roles && decoded.roles.indexOf('indicator reviewer') > -1;
}
export function isReviewer (token) {
  return isInternationalReviewer(token) || isNationalReviewer(token) || isIndicatorReviewer(token);
}

export function isAdmin (token) {
  const decoded = decode(token);
  return decoded.roles && decoded.roles.indexOf('admin') > -1;
}

export function sub (token) {
  const decoded = decode(token);
  return decoded.sub;
}

