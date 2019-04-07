import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

/**
  Usage:

  ```hbs
    {{peek-record "user" "1"}}
  ```

  @function peek-record
  @param {string} modelType the model type to request
  @param {string} id the id of the model to fetch from the store
  @return {TaskInstance} a TaskInstance that resolves immediately to a DS.Model
*/
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
