import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, waitFor } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | timeout', function(hooks) {
  setupRenderingTest(hooks);

  // TODO: this doesn't really test the actual timeout, just that it delays render a tiny bit
  test('it creates an EC task that waits until the given timeout and yields true by default', async function(assert) {
    this.set('waitForThisManyMs', 500);

    render(hbs`
      <div class="container">
        {{#let (timeout waitForThisManyMs) as |taskInstance|}}
          {{#if taskInstance.isRunning}}loading{{/if}}
          {{taskInstance.value}}
        {{/let}}
      </div>
    `);

    await waitFor('.container');

    assert.equal(this.element.textContent.trim(), 'loading', 'it exposes loading state');

    await settled();

    assert.equal(this.element.textContent.trim(), 'true', 'it yields true');
  });

  test('it creates an EC task that waits until the given timeout and yields whatever is passed as the second argument', async function(assert) {
    this.set('eggTimer', 500);

    render(hbs`
      <div class="container">
        {{#let (timeout eggTimer "tasty eggs") as |taskInstance|}}
          {{#if taskInstance.isRunning}}loading{{/if}}
          {{taskInstance.value}}
        {{/let}}
      </div>
    `);

    await waitFor('.container');

    assert.equal(this.element.textContent.trim(), 'loading', 'it exposes loading state');

    await settled();

    assert.equal(this.element.textContent.trim(), 'tasty eggs', 'it yields tasty eggs');
  });
});
