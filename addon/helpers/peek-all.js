import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

/**
  Usage:

  ```hbs
    {{peek-all "user"}}
  ```

  @function peek-all
  @param {string} modelType the model type to request
  @return {TaskInstance} a TaskInstance that resolves immediately to a DS.RecordArray
*/
export default Helper.extend({
  store: service(),
  peekAllTask: task(function * (modelType) {
    return yield this.store.peekAll(modelType);
  }),
  compute([modelType/*, ...rest*/]/*, hash*/) {
    return this.peekAllTask.perform(modelType);
  }
});
