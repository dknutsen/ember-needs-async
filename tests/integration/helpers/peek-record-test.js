import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Integration | Helper | peek-record', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  // TODO: there's probably a much better way to test this
  test('it properly peeks a model and exposes the task instance with value on success', async function(assert) {
    server.timing = 100;
    let user = server.create('user');
    this.set('modelType', 'user');
    this.set('id', '1');

    await render(hbs`
      <div class="container">
        {{#let (peek-record modelType id) as |taskInstance|}}
          {{#if taskInstance.isRunning}}loading{{/if}}
          {{#if taskInstance.value}}{{taskInstance.value.firstName}}{{/if}} 
        {{/let}}
      </div>
    `);

    assert.equal(this.element.textContent.trim(), '', 'the value is not rendered if there is nothign in the store');

    // load the model so it's in the store
    await render(hbs`
      {{#let (find-record modelType id) as |taskInstance|}}
        {{#if taskInstance.isRunning}}loading{{/if}}
      {{/let}}
    `);

    await render(hbs`
      <div class="container">
        {{#let (find-record modelType id) as |taskInstance|}}
          {{#if taskInstance.value}}{{taskInstance.value.firstName}}{{/if}} 
        {{/let}}
      </div>
    `);

    assert.equal(this.element.textContent.trim(), user.firstName, 'it exposes the model as the value when loaded');
  });


});
