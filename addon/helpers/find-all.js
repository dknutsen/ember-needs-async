import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Helper.extend({
  store: service(),
  findAllTask: task(function * (modelType) {
    return yield this.store.findAll(modelType);
  }),
  compute([modelType/*, ...rest*/]/*, hash*/) {
    return this.findAllTask.perform(modelType);
  }
});
