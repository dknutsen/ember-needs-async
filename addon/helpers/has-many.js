import Helper from '@ember/component/helper';
import { task } from 'ember-concurrency';

/**
  Usage:

  ```hbs
    {{has-many company "employees"}}
  ```

  @function has-many
  @param {DS.Model} model the model to fetch the has-many relationship from
  @param {string} relationship the name of the relationship to fetch
  @return {TaskInstance} a TaskInstance that resolves to a DS.RecordArray
*/
export default Helper.extend({
  hasManyTask: task(function * (model, relationship) {
    return yield model.hasMany(relationship).load();
  }),
  compute([model, relationship/*, ...rest*/]/*, hash*/) {
    // TODO: better error handling
    if(!model || !model.hasMany || !relationship) {
      return null;
    }
    return this.hasManyTask.perform(model, relationship);
  }
});
