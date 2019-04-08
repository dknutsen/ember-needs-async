import DS from 'ember-data';

export default DS.Model.extend({
  sender: DS.belongsTo('user'),
  receiver: DS.belongsTo('user'),

  message: DS.attr('string'),
  sent: DS.attr('date')
});
