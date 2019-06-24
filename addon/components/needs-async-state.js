import Component from '@ember/component';
import { computed, get } from '@ember/object';
import layout from '../templates/components/needs-async-state';

export default Component.extend({
  layout,
  tagName: '',
  isState: computed('taskInstance.{isRunning,value,error}', 'state', function() {
    return !!get(this.taskInstance, this.state);
  })
});
