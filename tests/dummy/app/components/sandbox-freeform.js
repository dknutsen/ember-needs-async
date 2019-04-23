import Component from '@ember/component';
import layout from '../templates/components/sandbox-freeform';
import Ember from 'ember';
const { TEMPLATES, HTMLBars } = Ember;
import { debounce } from '@ember/runloop';

export default Component.extend({
  layout,

  rerenderCounter: 0,

  rendered: false,

  templateContent: null,

  didReceiveAttrs() {
    debounce(this, this.debounceRerender, 500);
  },

  debounceRerender() {
    this.incrementProperty('rerenderCounter');
    this.rerender();
  },

  rerender(templateName) {
    if(!this.get('templateContent') || this.get('templateContent') === '') {
      return;
    }
    try {
      let compiled = HTMLBars.compile(`${this.get('templateContent')}`);
      TEMPLATES[`${this.elementId}freeform${this.get('rerenderCounter')}`] = compiled;
      setTimeout(() => {
        this.set('rendered', true);
      }, 100);
      this.set('error', null);
    } catch(error) {
      this.set('rendered', false);
      this.set('error', error)
    }
  },
});
