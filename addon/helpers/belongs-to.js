import Helper from '@ember/component/helper';
import { task } from 'ember-concurrency';

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
