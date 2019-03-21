import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Integration | Helper | find-record', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    server.create('user');
    this.set('modelType', 'user');
    this.set('id', '1');

    await render(hbs`{{#if (get (find-record modelType id) value)}}loading{{/if}}`);

    assert.equal(this.element.textContent.trim(), 'loading');
  });
});
