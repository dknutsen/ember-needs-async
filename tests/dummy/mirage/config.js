export default function() {

  /**
   * Mirage configuration
   */
  this.timing = 2000;

  // addon docs - for github pages
  this.passthrough('**/docs/ember-needs-async.json');
  this.passthrough('**/versions.json');
  // addon docs - for local development
  this.passthrough('docs/ember-needs-async.json');
  this.passthrough('versions.json');


  /**
   * Dummy app "backend" routes
   */
  this.get('/users');
  this.get('/users/:id');

  this.get('/organizations');
  this.get('organizations/:id');
}
