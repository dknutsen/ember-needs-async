import Helper from '@ember/component/helper';
import { task } from 'ember-concurrency';

/**
  Usage:

  ```hbs
    {{belongs-to user "company"}}
  ```

  @function belongs-to
  @param {DS.Model} model the model to fetch the belongs-to relationship from
  @param {string} relationship the name of the relationship to fetch
  @return {TaskInstance} a TaskInstance that resolves to a DS.Model
*/
export default Helper.extend({
  belongsToTask: task(function * (model, relationship) {
    return yield model.belongsTo(relationship).load();
  }),
  compute([model, relationship/*, ...rest*/]/*, hash*/) {
    // TODO: better error handling
    if(!model || !model.belongsTo || !relationship) {
      return null;
    }
    return this.belongsToTask.perform(model, relationship);
  }
});
