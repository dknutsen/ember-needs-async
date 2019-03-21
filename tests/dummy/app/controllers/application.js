import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  askQuestion: task(function * () {
    yield timeout(1000);
    this.set('result', Math.random());
    return this.result;
  }).drop(),

  result: null,

  taskInstance: null,

  actions: {
    onClick() {
      this.set('taskInstance', this.askQuestion.perform());
    }
  }
});
