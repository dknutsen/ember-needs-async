import Helper from '@ember/component/helper';
import { hash, task } from 'ember-concurrency';

export default Helper.extend({
  asyncHashTask: task(function * (tasks) {
    return yield hash(tasks);
  }),
  compute([tasks/*, ...rest*/]/*, hash*/) {
    return this.asyncHashTask.perform(tasks);
  }
});
