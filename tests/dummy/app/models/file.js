import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  name: DS.attr(),

  folder: DS.belongsTo('folder', { inverse: 'files' })
});
