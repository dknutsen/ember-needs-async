//import EmberRouter from '@ember/routing/router';
import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from './config/environment';

const Router = AddonDocsRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('sandbox');
  this.route('examples', function() {
    this.route('user-card');
  });
  docsRoute(this, function() {
    this.route('index');
    this.route('usage');
    this.route('needs-async');
    this.route('find-record');
    this.route('find-all');
    this.route('peek-record');
    this.route('peek-all');
    this.route('belongs-to');
    this.route('has-many');
    this.route('async-all');
    this.route('async-hash');
  });
  this.route('not-found', { path: '/*path' });
});

export default Router;
