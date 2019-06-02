/* global QUnit */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror, settled, waitFor } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Helper | has-many', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  // TODO: there's probably a much better way to test this
  test('it properly requests a model and exposes the task instance with value on success', async function(assert) {

    server.timing = 100;

    let company = server.create('organization');
    let users = server.createList('user', 2, { company });

    render(hbs`
      {{#let (find-record "organization" "1") as |taskInstance|}}
        {{#if taskInstance.value}}
          <div class="container">
            {{#let (has-many taskInstance.value "employees") as |cti|}}
              {{#if cti.isRunning}}loading{{/if}}
              {{#if cti.value}}
                {{#each cti.value as |user|}}
                  {{~user.firstName~}}
                {{/each}}
              {{/if}} 
            {{/let}}
          </div>
        {{/if}}
      {{/let}}
    `);

    await waitFor('.container');

    assert.equal(this.element.textContent.trim(), 'loading', 'it exposes loading state');

    await settled();

    assert.equal(this.element.textContent.trim(), users.map(u => u.firstName).join(''), 'it exposes the model as the value when loaded');

  });

  test('it properly requests a model and exposes the task instance with error state', async function(assert) {
    setupOnerror(function(err) {
      assert.ok(err, 'An error is thrown');
    });

    server.get('/users/:id', { errors: ['There was an error'] }, 500);
    server.timing = 100;

    let company = server.create('organization');
    server.createList('user', 2, { company });

    render(hbs`
      {{#let (find-record "organization" "1") as |taskInstance|}}
        {{#if taskInstance.value}}
          <div class="container">
            {{#let (has-many taskInstance.value "employees") as |cti|}}
              {{#if cti.isRunning}}loading{{/if}}
              {{#if cti.error}}ERROR{{/if}} 
            {{/let}}
          </div>
        {{/if}}
      {{/let}}
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
