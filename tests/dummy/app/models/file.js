import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),

  folder: DS.belongsTo('folder', { inverse: 'files' })
});
