import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Integration | Helper | find-all', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('modelType', 'user');

    await render(hbs`{{find-all modelType}}`);

    assert.equal(this.element.textContent.trim(), '1234');
  });
});
