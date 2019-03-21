import Helper from '@ember/component/helper';
import { task } from 'ember-concurrency';

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
