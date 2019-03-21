import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  motto: DS.attr('string'),

  street: DS.attr('string'),
  city: DS.attr('string'),
  state: DS.attr('string'),
  zip: DS.attr('string'),

  employees: DS.hasMany('user', { inverse: 'company' })
});
