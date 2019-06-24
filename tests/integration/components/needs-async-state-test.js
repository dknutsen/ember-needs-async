import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | needs-async-state', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it yields the correct state from the given task instance', async function(assert) {
    this.set('taskInstance', { value: 5 });

    await render(hbs`
      {{#needs-async-state state="value" taskInstance=taskInstance as |value|}}
        {{value}}
      {{/needs-async-state}}
    `);

    assert.equal(this.element.textContent.trim(), '5', 'it correctly yields the correct taskInstance state');
  });

  test('it yields the value even if it is an empty DS.ManyArray', async function(assert) {
    this.set('taskInstance', { value: 5 });

    server.create('organization');

    await render(hbs`
      {{#needs-async needs=(find-record "organization" "1") as |s|}}
        {{#s.loaded as |org|}}  
          {{#needs-async needs=(has-many org "employees") as |s2|}}
            {{#s2.loaded}}
              RENDER ME 
            {{/s2.loaded}}
          {{/needs-async}}
        {{/s.loaded}}
      {{/needs-async}}
    `);

    assert.equal(this.element.textContent.trim(), 'RENDER ME', 'it renders the loaded block from an empty hasMany');
  });
});
