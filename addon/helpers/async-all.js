import Helper from '@ember/component/helper';
import { all, task } from 'ember-concurrency';

export default Helper.extend({
  asyncAllTask: task(function * (tasks) {
    return yield all(tasks);
  }),
  compute([tasks/*, ...rest*/]/*, hash*/) {
    return this.asyncAllTask.perform(tasks);
  }
});
