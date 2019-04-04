import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Integration | Helper | peek-all', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  // TODO: there's probably a much better way to test this
  test('it properly peeks all models and exposes the task instance with value on success', async function(assert) {
    let users = server.createList('user', 5);
    this.set('modelType', 'user');

    await render(hbs`
      <div class="container">
        {{#let (peek-all modelType) as |taskInstance|}}
          {{#if taskInstance.value}}
            {{#each taskInstance.value as |user|}}
              {{~user.firstName~}}
            {{/each}}
          {{/if}} 
        {{/let}}
      </div>
    `);

    assert.equal(this.element.textContent.trim(), '', 'nothing is rendered if no records are in the store');

    // fetch the records from the store (should probably do this with the store service instead)
    await render(hbs`
      {{#let (find-all modelType) as |taskInstance|}}
        {{#if taskInstance.isRunning}}loading{{/if}}
      {{/let}}
    `);

    await render(hbs`
      <div class="container">
        {{#let (peek-all modelType) as |taskInstance|}}
          {{#if taskInstance.value}}
            {{#each taskInstance.value as |user|}}
              {{~user.firstName~}}
            {{/each}}
          {{/if}} 
        {{/let}}
      </div>
    `);

    assert.equal(this.element.textContent.trim(), users.map(u => u.firstName).join(''), 'it exposes the model as the value when loaded');
  });
});
