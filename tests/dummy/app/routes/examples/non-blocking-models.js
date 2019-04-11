import Route from '@ember/routing/route';
import { task, timeout } from 'ember-concurrency';

export default Route.extend({
  timeoutTask: task(function * (milliseconds, value) {
    yield timeout(milliseconds);
    return value;
  }),
  findRecordTask: task(function * (modelType, id, options) {
    return yield this.store.findRecord(modelType, id, options);
  }),

  model(/*params, transition*/) {
    return {
      me: this.findRecordTask.perform('user', '1', { include: 'company' })
    };
  },
});
