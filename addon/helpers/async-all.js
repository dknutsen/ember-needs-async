import Helper from '@ember/component/helper';
import { all, task } from 'ember-concurrency';

/**
  Usage:

  ```hbs
    {{async-all (array
      (find-record "user" "1")
      (find-record "user" "2")
    )}}
  ```

  @function async-all
  @param {array} taskInstances an array of Ember Concurrency task instances
  @return {TaskInstance} a TaskInstance that resolves to an array of TaskInstance results
*/
export default Helper.extend({
  asyncAllTask: task(function * (tasks) {
    return yield all(tasks);
  }),
  compute([tasks/*, ...rest*/]/*, hash*/) {
    return this.asyncAllTask.perform(tasks);
  }
});
