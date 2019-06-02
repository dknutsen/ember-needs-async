import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, waitFor } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Helper | async-hash', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  // TODO: there's probably a much better way to test this
  test('it properly requests a model and exposes the task instance with value on success', async function(assert) {
    server.timing = 100;
    let users = server.createList('user', 2);
    this.set('modelType', 'user');
    this.set('user1', users[0]);
    this.set('user2', users[1]);
    render(hbs`
      <div class="container">
        {{#let (async-hash (hash
          user1=(find-record modelType user1.id)
          user2=(find-record modelType user2.id)
        )) as |taskInstance|}}
          {{#if taskInstance.isRunning}}loading{{/if}}
          {{#if taskInstance.value}}
            {{#each-in taskInstance.value as |title user|}}
              {{~title}}:{{user.id}},
            {{~/each-in}}
          {{/if}} 
        {{/let}}
      </div>
    `);

    await waitFor('.container');

    assert.equal(this.element.textContent.trim(), 'loading', 'it exposes loading state');

    await settled();

    assert.equal(this.element.textContent.trim(), "user1:1,user2:2,", 'it exposes the model as the value when loaded');
  });
});
