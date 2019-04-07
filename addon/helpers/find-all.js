import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

/**
  Usage:

  ```hbs
    {{find-all "user" (hash include="company")}}
  ```

  @function find-all
  @param {string} modelType the model type to request
  @param {object} options (optional) options to pass to the store.findAll method
  @return {TaskInstance} a TaskInstance that resolves to a DS.RecordArray
*/
export default Helper.extend({
  store: service(),
  findAllTask: task(function * (modelType, options) {
    return yield this.store.findAll(modelType, options);
  }),
  compute([modelType, options/*, ...rest*/]/*, hash*/) {
    return this.findAllTask.perform(modelType, options);
  }
});
