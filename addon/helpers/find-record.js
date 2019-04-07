import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

/**
  Usage:

  ```hbs
    {{find-record "user" "1" (hash include="company")}}
  ```

  @function find-all
  @param {string} modelType the model type to request
  @param {string} id the id of the model to request
  @param {object} options (optional) options to pass to the store.findRecord method
  @return {Promise} a promise that resolves to a DS.Model
*/
export default Helper.extend({
  store: service(),
  findRecordTask: task(function * (modelType, id, options) {
    return yield this.store.findRecord(modelType, id, options);
  }),
  compute([modelType, id, options/*, ...rest*/]/*, hash*/) {
    if(!id) return null;
    return this.findRecordTask.perform(modelType, id, options);
  }
});
