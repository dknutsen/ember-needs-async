/* global QUnit */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror, settled, waitFor } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Integration | Helper | find-all', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  // TODO: there's probably a much better way to test this
  test('it properly requests a model and exposes the task instance with value on success', async function(assert) {
    server.timing = 100;
    let users = server.createList('user', 5);
    this.set('modelType', 'user');
    render(hbs`
      <div class="container">
        {{#let (find-all modelType) as |taskInstance|}}
          {{#if taskInstance.isRunning}}loading{{/if}}
          {{#if taskInstance.value}}
            {{#each taskInstance.value as |user|}}
              {{~user.firstName~}}
            {{/each}}
          {{/if}} 
        {{/let}}
      </div>
    `);

    await waitFor('.container');

    assert.equal(this.element.textContent.trim(), 'loading', 'it exposes loading state');

    await settled();

    assert.equal(this.element.textContent.trim(), users.map(u => u.firstName).join(''), 'it exposes the model as the value when loaded');
  });

  test('it correctly passes findAll options to the backend', async function(assert) {
    assert.expect(1);

    server.timing = 100;
    server.get('/users', (schema, request) => {
      assert.equal(request.queryParams.include, 'company', 'the include paramter is passed to the backend');
      return schema.users.all();
    });

    server.create('user');
    this.set('modelType', 'user');

    await render(hbs`
      <div class="container">
        {{#let (find-all modelType (hash include="company")) as |taskInstance|}}
          {{#if taskInstance.isRunning}}loading{{/if}}
          {{#if taskInstance.value}}{{taskInstance.value.firstObject.firstName}}{{/if}} 
        {{/let}}
      </div>
    `);
  });

  // TODO: there's probably a much better way to test this
  test('it properly requests a model and exposes the task instance with error state', async function(assert) {
    server.get('/users', {errors: ['There was an error']}, 500);

    setupOnerror(function(err) {
      assert.ok(err, 'An error is thrown');
    });

    server.timing = 100;

    render(hbs`
      <div class="container">
        {{#let (find-all "user") as |taskInstance|}}
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
