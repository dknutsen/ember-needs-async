import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | needs-async-state', function(hooks) {
  setupRenderingTest(hooks);

  test('it yields the correct state from the given task instance', async function(assert) {
    this.set('taskInstance', { value: 5 });

    await render(hbs`
      {{#needs-async-state state="value" taskInstance=taskInstance as |value|}}
        {{value}}
      {{/needs-async-state}}
    `);

    assert.equal(this.element.textContent.trim(), '5', 'it correctly yields the correct taskInstance state');
  });
});
