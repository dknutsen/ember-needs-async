import Helper from '@ember/component/helper';
import { task, timeout } from 'ember-concurrency';

/**
  Usage:

  ```hbs
    {{timeout 1000}}
  ```

  @function timeout
  @param {string} milliseconds the number of milliseconds to wait
  @param {*} value (optional, default true) the value to yield once the timeout has expired
  @return {TaskInstance} a TaskInstance that resolves to null
*/
export default Helper.extend({
  timeoutTask: task(function * (milliseconds, value) {
    yield timeout(milliseconds);
    return value;
  }),
  compute([milliseconds, value=true/*, ...rest*/]/*, hash*/) {
    return this.timeoutTask.perform(milliseconds, value);
  }
});
