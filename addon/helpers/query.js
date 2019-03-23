import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Helper.extend({
  store: service(),
  queryTask: task(function * (modelType, hash) {
    return yield this.store.query(modelType, hash);
  }),
  compute([modelType, hash/*, ...rest*/]/*, hash*/) {
    return this.queryTask.perform(modelType, hash);
  }
});
