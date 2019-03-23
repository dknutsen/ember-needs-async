import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Helper.extend({
  store: service(),
  peekRecordTask: task(function * (modelType, id) {
    return yield this.store.peekRecord(modelType, id);
  }),
  compute([modelType, id/*, ...rest*/]/*, hash*/) {
    if(!id) return null;
    return this.peekRecordTask.perform(modelType, id);
  }
});
