/* global QUnit */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror, settled, waitFor } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Integration | Component | needs-async', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  // TODO: there's probably a much better way to test this
  test('it renders the loading and loaded states correctly for a successful task instance', async function(assert) {
    server.timing = 100;
    let user = server.create('user');
    this.set('modelType', 'user');
    this.set('id', '1');

    render(hbs`
      <div class="container">
        {{#needs-async needs=(find-record modelType id) as |states|}}
          {{#states.loading}}loading{{/states.loading}}
          {{#states.loaded as |user|}}{{user.firstName}}{{/states.loaded}}
        {{/needs-async}}
      </div>
    `);

    await waitFor('.container');

    assert.equal(this.element.textContent.trim(), 'loading', 'it exposes loading state');

    await settled();

    assert.equal(this.element.textContent.trim(), user.firstName, 'it exposes the model as the value when loaded');
  });


  // TODO: there's probably a much better way to test this
  test('it renders the error state correctly for a task instance error', async function(assert) {
    setupOnerror(function(err) {
      assert.ok(err, 'An error is thrown');
    });

    server.timing = 100;
    this.set('modelType', 'user');
    this.set('id', '1');

    render(hbs`
      <div class="container">
        {{#needs-async needs=(find-record modelType id) as |states|}}
          {{#states.loading}}loading{{/states.loading}}
          {{#states.error as |error|}}ERROR{{/states.error}}
        {{/needs-async}}
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
