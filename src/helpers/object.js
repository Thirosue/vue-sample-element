

import is from 'is_js';
import _ from 'lodash';

export const notNullValue = obj => Object.entries(obj)
  .filter(([, val]) => is.not.empty(val) && is.not.null(val)) // 空文字を除去
  .reduce(
    (o, [name, val]) => ({ ...o, [name]: val }),
    {},
  );

export const convertKeys = (obj, ...targets) => Object.entries(obj)
  .filter(([name]) => targets.map(target => target[0]).includes(name))
  .reduce(
    (o, [name, val]) => ({ ...o, [_.head(targets.filter(target => target[0] === name))[1]]: val }),
    {},
  );