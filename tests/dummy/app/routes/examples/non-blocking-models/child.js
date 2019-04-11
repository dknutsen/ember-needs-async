import Route from '@ember/routing/route';
import { task } from 'ember-concurrency';

export default Route.extend({
  findRecordTask: task(function * (modelType, id, options) {
    return yield this.store.findRecord(modelType, id, options);
  }),
  queryTask: task(function * (modelType, hash) {
    return yield this.store.query(modelType, hash);
  }),

  beforeModel(/*transition*/) {
    // wait to fetch our model until the parent model 'me' data is loaded
    let parentModel = this.modelFor('examples.non-blocking-models');
    return parentModel.me;
  },

  model(params/*, transition*/) {
    let parentModel = this.modelFor('examples.non-blocking-models');

    return {
      me: parentModel.me,
      user: this.findRecordTask.perform('user', params.id),
    };
  },
});
