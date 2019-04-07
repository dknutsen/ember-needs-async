import Helper from '@ember/component/helper';
import { hash, task } from 'ember-concurrency';

/**
  Usage:

  ```hbs
    {{async-hash (hash
      foo=(find-record "user" "1")
      bar=(find-record "user" "2")
    )}}
  ```

  @function async-hash
  @param {array} taskInstances an array of Ember Concurrency task instances
  @return {TaskInstance} a TaskInstance that resolves to a hash of TaskInstance results
*/
export default Helper.extend({
  asyncHashTask: task(function * (tasks) {
    return yield hash(tasks);
  }),
  compute([tasks/*, ...rest*/]/*, hash*/) {
    return this.asyncHashTask.perform(tasks);
  }
});
