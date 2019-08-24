import is from 'is_js';
import _ from 'lodash';
import moment from 'moment';

// 汎用
const YYYYMMDD = value => moment(value).format('YYYY/MM/DD');
const YYYYMMDDHHmm = value => moment(value).format('YYYY/MM/DD HH:mm');
const YYYYMMDDHHmmss = value => moment(value).format('YYYY/MM/DD HH:mm:ss');
const joinComma = list => _.join(list, ', ');
const joinSpace = list => _.join(list, ' ');

// カンマ表示
const AddComma = value => ((value && is.number(value)) ? Number(value).toLocaleString() : value);
const Flag = value => ((value === '1' || value) ? '有り' : '無し');

export default {
  YYYYMMDD,
  YYYYMMDDHHmm,
  YYYYMMDDHHmmss,
  AddComma,
  Flag,
  joinComma,
  joinSpace,
};
