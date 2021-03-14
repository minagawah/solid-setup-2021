import { concat } from './utils';

/**
 * LICENSE
 * CC BY-SA 3.0
 * Copyright (c) 2016 joelnet
 *
 * Revised based on joelnet's answer on Stack Overflow:
 * https://stackoverflow.com/questions/24586110/resolve-promises-one-after-another-i-e-in-sequence#41115086
 *
 * Usage:
 * const numbers = [0, 1, 2];
 * promiseSerial(
 *   numbers.map(n => () =>
 *     new Promise(resolve => {
 *       setTimeout(() => {
 *         resolve(n);
 *       }, 10);
 *     })
 *   )
 * ).then(console.log.bind(console));
 */
const promiseConcat = f => x => f().then(concat(x));
const promiseReduce = (acc, x) => acc.then(promiseConcat(x));
export const promiseSerial = funcs =>
  funcs.reduce(promiseReduce, Promise.resolve([]));
