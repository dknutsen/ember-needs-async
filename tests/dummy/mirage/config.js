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

  this.get('/messages', ({ messages }, request) => {
    let sid = request.queryParams.sender;
    let rid = request.queryParams.receiver;
    let filtered = messages.all().filter((message) => {
      let matches = true;
      matches = matches && (!sid || sid === message.senderId);
      matches = matches && (!rid || rid === message.receiverId);
      return matches;
    });
    return filtered;
  });

  this.get('/folders');
  this.get('/folders/:id');
  this.get('/files');
  this.get('/files/:id');
}
