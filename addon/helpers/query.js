import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

/**
  Usage:

  ```hbs
    {{query "user" (hash lastName="smith" page=2)}}
  ```

  @function query
  @param {string} modelType the model type to request
  @param {object} query the hash that includes all params for the query
  @return {TaskInstance} a TaskInstance that resolves to a DS.RecordArray
*/
export default Helper.extend({
  store: service(),
  queryTask: task(function * (modelType, hash) {
    return yield this.store.query(modelType, hash);
  }),
  compute([modelType, hash/*, ...rest*/]/*, hash*/) {
    return this.queryTask.perform(modelType, hash);
  }
});
