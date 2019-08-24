import is from 'is_js';
import moment from 'moment';

export const isEmpty = value => (is.empty(value) || is.null(value) || is.undefined(value));
export const isNotEmpty = value => !isEmpty(value);

export const isEmail = value => is.email(value);

export const isTel = (value) => {
  if (String(value).length === 0) { return true; }
  const tel = value.replace(/[━.*‐.*―.*－.*\-.*ー.*-]/gi, '');
  const result = tel.match(/^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/);
  return is.not.null(result);
};

export const isExpectLength = (value, { max = Infinity, min = 0 } = {}) => {
  if (isEmpty(value)) {
    return true;
  }
  const str = String(value);
  if (str.length > max) {
    return false;
  }
  if (str.length < min) {
    return false;
  }
  return true;
};

export const isInteger = (value) => {
  const num = Number(value);
  return is.integer(num) && num >= -2147483648 && num <= 2147483647;
};

export const isFlag = value => ['0', '1'].includes(value);

export const isDate = (value) => {
  if (isEmpty(value)) {
    return true;
  }
  return moment(value).isValid();
};

export const isBirthDay = (value) => {
  if (isDate(value)) {
    return true;
  }
  return moment(value).isBefore(moment());
};
