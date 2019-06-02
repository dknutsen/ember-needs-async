/* global QUnit */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror, settled, waitFor } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Helper | find-record', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  // TODO: there's probably a much better way to test this
  test('it properly requests a model and exposes the task instance with value on success', async function(assert) {
    server.timing = 100;
    let user = server.create('user');
    this.set('modelType', 'user');
    this.set('id', '1');

    render(hbs`
      <div class="container">
        {{#let (find-record modelType id) as |taskInstance|}}
          {{#if taskInstance.isRunning}}loading{{/if}}
          {{#if taskInstance.value}}{{taskInstance.value.firstName}}{{/if}} 
        {{/let}}
      </div>
    `);

    await waitFor('.container');

    assert.equal(this.element.textContent.trim(), 'loading', 'it exposes loading state');

    await settled();

    assert.equal(this.element.textContent.trim(), user.firstName, 'it exposes the model as the value when loaded');
  });

  test('it correctly passes an options hash to the findRecord method', async function(assert) {
    assert.expect(1);

    server.timing = 100;
    server.get('/users/:id', (schema, request) => {
      assert.equal(request.queryParams.include, 'company', 'the include paramter is passed to the backend');
      return schema.users.find(request.params.id);
    });

    server.create('user');
    this.set('modelType', 'user');
    this.set('id', '1');

    await render(hbs`
      <div class="container">
        {{#let (find-record modelType id (hash include="company")) as |taskInstance|}}
          {{#if taskInstance.isRunning}}loading{{/if}}
          {{#if taskInstance.value}}{{taskInstance.value.firstName}}{{/if}} 
        {{/let}}
      </div>
    `);
  });

  // TODO: there's probably a much better way to test this
  test('it properly requests a model and exposes the task instance with error state', async function(assert) {
    setupOnerror(function(err) {
      assert.ok(err, 'An error is thrown');
    });

    server.timing = 100;
    this.set('modelType', 'user');
    this.set('id', '1');

    render(hbs`
      <div class="container">
        {{#let (find-record modelType id) as |taskInstance|}}
          {{#if taskInstance.isRunning}}loading{{/if}}
          {{#if taskInstance.error}}ERROR{{/if}} 
        {{/let}}
      </div>
    `);
    await waitFor('.container');

    assert.equal(this.element.textContent.trim(), 'loading', 'it exposes loading state');

    await settled();

    assert.equal(this.element.textContent.trim(), 'ERROR', 'it exposes the error state when there is an error');

    QUnit.testDone(function() {
      resetOnerror();
    })
  });

});
