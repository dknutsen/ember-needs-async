/* global QUnit */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror, settled, waitFor } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Helper | belongs-to', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  // TODO: there's probably a much better way to test this
  test('it properly requests a model and exposes the task instance with value on success', async function(assert) {
    server.timing = 100;

    let company = server.create('organization');
    server.create('user', { company });

    render(hbs`
      {{#let (find-record "user" "1") as |taskInstance|}}
        {{#if taskInstance.value}}
          <div class="container">
            {{#let (belongs-to taskInstance.value "company") as |cti|}}
              {{#if cti.isRunning}}loading{{/if}}
              {{#if cti.value}}{{cti.value.name}}{{/if}} 
            {{/let}}
          </div>
        {{/if}}
      {{/let}}
    `);

    await waitFor('.container');

    assert.equal(this.element.textContent.trim(), 'loading', 'it exposes loading state');

    await settled();

    assert.equal(this.element.textContent.trim(), company.name, 'it exposes the model as the value when loaded');

  });


  test('it properly requests a model and exposes the task instance with error state', async function(assert) {
    setupOnerror(function(err) {
      assert.ok(err, 'An error is thrown');
    });

    server.get('/organizations/:id', { errors: ['There was an error'] }, 500);
    server.timing = 100;

    let company = server.create('organization');
    server.create('user', { company });

    render(hbs`
      {{#let (find-record "user" "1") as |taskInstance|}}
        {{#if taskInstance.value}}
          <div class="container">
            {{#let (belongs-to taskInstance.value "company") as |cti|}}
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
