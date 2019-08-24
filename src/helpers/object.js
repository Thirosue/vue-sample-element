

import is from 'is_js';

const notNullValue = obj => Object.entries(obj)
  .filter(([, val]) => is.not.empty(val) && is.not.null(val)) // 空文字を除去
  .reduce(
    (o, [name, val]) => ({ ...o, [name]: val }),
    {},
  );

export { notNullValue as default };