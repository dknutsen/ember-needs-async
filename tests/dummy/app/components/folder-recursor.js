import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  folder: null,

  maxDepth: 2,

  level: 1,

  nextLevel: computed('level', 'maxDepth', function() {
    if (this.maxDepth > this.level) {
      return this.level + 1;
    }
    return null;
  })
});
