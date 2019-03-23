import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Helper.extend({
  store: service(),
  peekAllTask: task(function * (modelType) {
    return yield this.store.peekAll(modelType);
  }),
  compute([modelType/*, ...rest*/]/*, hash*/) {
    return this.peekAllTask.perform(modelType);
  }
});
